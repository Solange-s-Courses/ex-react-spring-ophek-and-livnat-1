package com.example.backendex3.repositories;

import org.springframework.stereotype.Repository;
import java.io.*;
import java.util.*;

/**
 * Repository class for managing score persistence.
 * This class handles reading and writing score data to a binary file using ObjectStreams.
 * Thread-safe operations are ensured using synchronized methods.
 */
@Repository
public class ScoreRepository {

    private static final String SCORES_FILE = "scores.ser";

    /**
     * Retrieves all scores from the serialized file.
     *
     * @return List of all scores in the leaderboard.
     * @throws IOException if there's an error reading the file.
     */
    @SuppressWarnings("unchecked")
    public synchronized List<Score> getAllScores() throws IOException {
        List<Score> scores = new ArrayList<>();
        File file = new File(SCORES_FILE);

        if (!file.exists()) {
            return scores;
        }

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            scores = (List<Score>) ois.readObject();
        } catch (ClassNotFoundException e) {
            throw new IOException("Error reading scores file", e);
        } catch (EOFException e) {
            // Empty file, return empty list
            return scores;
        }

        return scores;
    }


    /**
     * Saves a new score to the leaderboard or updates an existing score.
     * If a player with the same nickname already exists, their score will be updated
     * only if the new score is higher.
     *
     * @param newScore The new {@link Score} to save or update.
     * @return true if the score was added or updated; false if no change was made.
     * @throws IOException if there's an error writing to the file.
     */
    public synchronized boolean saveScore(Score newScore) throws IOException {

        List<Score> scores = getAllScores();
        boolean updated = false;

        // Check if player with the same nickname already exists
        for (int i = 0; i < scores.size(); i++) {
            if (scores.get(i).getNickname().equalsIgnoreCase(newScore.getNickname())) {
                if (newScore.getScore() > scores.get(i).getScore()) {
                    scores.set(i, newScore);
                    updated = true;
                }
                break;
            }
        }
        // Add new score if player doesn't exist
        if (!updated && !playerExists(scores, newScore.getNickname())) {
            scores.add(newScore);
            updated = true;
        }

        if (updated) {
            // Sort scores in descending order before saving
            scores.sort(Comparator.comparingInt(Score::getScore).reversed());
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(SCORES_FILE))) {
                oos.writeObject(scores);
            }
        }

        return updated;
    }


    /**
     * Checks if a player with the given nickname already exists in the leaderboard.
     *
     * @param scores List of scores to check.
     * @param nickname The nickname to look for.
     * @return true if the player exists, false otherwise.
     */
    private boolean playerExists(List<Score> scores, String nickname) {
        for (Score score : scores) {
            if (score.getNickname().equalsIgnoreCase(nickname)) {
                return true;
            }
        }
        return false;
    }
}