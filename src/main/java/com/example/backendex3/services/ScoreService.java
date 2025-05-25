package com.example.backendex3.services;

import com.example.backendex3.repositories.Score;
import com.example.backendex3.repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

/**
 * Service class for leaderboard functionality.
 * This class provides business logic for managing game scores.
 */
@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    /**
     * Calculates a player's score based on game statistics.
     *
     * @param timeTakenMS Time taken to complete the game in seconds
     * @param attempts         Number of attempts made by the player
     * @param usedHint         Whether the player used a hint
     * @param wordLength       Length of the word
     * @return Calculated score value
     */
    public int calculateScore(int timeTakenMS, int attempts, boolean usedHint, int wordLength) {
        // Base score depends on word length
        int baseScore = wordLength * 100;

        // Time bonus with exponential decay
        // Convert MS to seconds for easier calculation
        double timeTakenSeconds = timeTakenMS / 1000.0;

        // Maximum time bonus (for very fast completion)
        int maxTimeBonus = 500;

        // Decay factor - adjust this to change how quickly bonus decreases
        double decayFactor = 0.1; // Lower = slower decay, higher = faster decay

        // Exponential decay: bonus = maxBonus * e^(-decayFactor * time)
        int timeBonus = (int) (maxTimeBonus * Math.exp(-decayFactor * timeTakenSeconds));


        // Time factor: faster is better
        //int timeBonus = Math.max(0, 500000 - (timeTakenMS * 2));

        // Attempts penalty: fewer attempts is better
        int attemptsPenalty = attempts * 25;

        // Hint penalty
        int hintPenalty = usedHint ? 100 : 0;

        // Calculate final score
        int finalScore = baseScore + timeBonus - attemptsPenalty - hintPenalty;

        // Ensure score is not negative
        return Math.max(finalScore, 0);
    }

    /**
     * Saves a player's score to the leaderboard.
     * Updates the score if the player already exists and the new score is higher.
     *
     * @param nickname Player's unique nickname
     * @param score Calculated score value
     * @return true if the score was saved/updated successfully, false otherwise
     * @throws IOException if there's an error with file operations
     */
    public boolean savePlayerScore(String nickname, int score) throws IOException {

        Score scoreEntry = new Score(nickname, score);
        boolean addScore = scoreRepository.saveScore(scoreEntry);

        int rank = getPlayersRank(nickname);
        int leaderboardScore = getPlayersScore(rank-1);

        // means we updated our score or it didn't appear
        return leaderboardScore == score;

    }

    /**
     * Retrieves the entire leaderboard.
     *
     * @return List of all scores, sorted in descending order
     * @throws IOException if there's an error reading the file
     */
    public List<Score> getLeaderboard() throws IOException {
        return scoreRepository.getAllScores();
    }

    public int getPlayersRank(String nickname) throws IOException {
        List<Score> scores = scoreRepository.getAllScores();
        int i = 0;
        for ( i = 0; i < scores.size(); i++) {
            if (scores.get(i).getNickname().equals(nickname)) {
                break;
            }
        }
        return i + 1;
    }

    public int getPlayersScore(int index) throws IOException {
        List<Score> scores = scoreRepository.getAllScores();
        return scores.get(index).getScore();
    }

    /**
     * Gets the top N scores from the leaderboard.
     *
     * @param limit Maximum number of scores to return
     * @return List of top scores, sorted in descending order
     * @throws IOException if there's an error reading the file
     */
    public List<Score> getTopScores(int limit) throws IOException {
        return scoreRepository.getTopScores(limit);
    }

}