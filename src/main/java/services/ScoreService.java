package services;

import repositories.Score;
import repositories.ScoreRepository;
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
     * @param timeTakenSeconds Time taken to complete the game in seconds
     * @param attempts         Number of attempts made by the player
     * @param usedHint         Whether the player used a hint
     * @param wordLength       Length of the word
     * @return Calculated score value
     */
    public int calculateScore(int timeTakenSeconds, int attempts, boolean usedHint, int wordLength) {
        // Base score depends on word length
        int baseScore = wordLength * 100;

        // Time factor: faster is better
        int timeBonus = Math.max(0, 500 - (timeTakenSeconds * 2));

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
        return scoreRepository.saveScore(scoreEntry);
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