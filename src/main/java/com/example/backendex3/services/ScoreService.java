package com.example.backendex3.services;

import com.example.backendex3.repositories.Score;
import com.example.backendex3.repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

/**
 * Service class for leaderboard functionality.
 * This class provides business logic for managing game scores.
 */
@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    /**
     * Constructor with dependency injection.
     *
     * @param scoreRepository the ScoreRepository to be used
     */
    @Autowired
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    /**
     * Calculates a player's score based on game statistics.
     *
     * @param timeTakenMS Time taken to complete the game in milliseconds
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
     * If the player already exists and the new score is higher, it updates the leaderboard.
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
     * Retrieves the full leaderboard, sorted by score in descending order.
     *
     * @return List of Score objects
     * @throws IOException if there's an error reading the file
     */
    public List<Score> getLeaderboard() throws IOException {
        return scoreRepository.getAllScores();
    }

    /**
     * Gets the rank (1-based index) of a specific player in the leaderboard.
     *
     * @param nickname Nickname of the player
     * @return Rank of the player (1 if first, etc.)
     * @throws IOException if reading the score file fails
     * @throws ResponseStatusException with status 404 (NOT_FOUND) if the nickname is not found
     */
    public int getPlayersRank(String nickname) throws IOException {
        List<Score> scores = scoreRepository.getAllScores();
        for (int i = 0; i < scores.size(); i++) {
            if (scores.get(i).getNickname().equals(nickname)) {
                return i + 1;
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nickname " + nickname + " not found");
    }

    /**
     * Gets the score of a player by their index in the leaderboard.
     *
     * @param index Index in the leaderboard (0-based)
     * @return The score of the player
     * @throws IOException if reading the score file fails
     * @throws IllegalArgumentException if the index is negative
     * @throws ResponseStatusException with status 404 (NOT_FOUND) if the index is out of bounds
     */
    public int getPlayersScore(int index) throws IOException {
        if (index < 0) {
            throw new IllegalArgumentException("Index " + index + " is negative");
        }

        List<Score> scores = scoreRepository.getAllScores();
        if (index >= scores.size()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Index " + index + " is out of bounds");
        }

        return scores.get(index).getScore();
    }
}