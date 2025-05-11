package dto;
import static utils.ValidationUtil.*;

/**
 * Data Transfer Object for game statistics and score calculation.
 * Used to transfer game results from the frontend to the backend.
 */
public class ScoreDTO {
    private String nickname;
    private int timeTakenSeconds;
    private int attempts;
    private boolean usedHint;
    private int wordLength;

    // Default constructor
    public ScoreDTO() {}

    /**
     * Creates a new ScoreDTO with all game statistics
     *
     * @param nickname Player's unique nickname
     * @param timeTakenSeconds Time taken to complete the game in seconds
     * @param attempts Number of attempts made by the player
     * @param usedHint Whether the player used a hint
     * @param wordLength Length of the word
     */
    public ScoreDTO(String nickname, int timeTakenSeconds, int attempts, boolean usedHint, int wordLength) {
        setNickname(nickname);
        setTimeTakenSeconds(timeTakenSeconds);
        setAttempts(attempts);
        this.usedHint = usedHint;
        setWordLength(wordLength);
    }

    // Getters and setters
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        checkNotEmpty(nickname);
        this.nickname = nickname;
    }

    public int getTimeTakenSeconds() {
        return timeTakenSeconds;
    }

    public void setTimeTakenSeconds(int timeTakenSeconds) {
        checkIsValidTime(timeTakenSeconds);
        this.timeTakenSeconds = timeTakenSeconds;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        checkIsValidAttempts(attempts);
        this.attempts = attempts;
    }

    public boolean isUsedHint() {
        return usedHint;
    }

    public void setUsedHint(boolean usedHint) {
        this.usedHint = usedHint;
    }

    public int getWordLength() {
        return wordLength;
    }

    public void setWordLength(int wordLength) {
        checkIsValidWordLength(wordLength);
        this.wordLength = wordLength;
    }
}
