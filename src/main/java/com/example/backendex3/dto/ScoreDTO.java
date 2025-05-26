package com.example.backendex3.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

/**
 * Data Transfer Object (DTO) for receiving game statistics and score input from clients.
 * This class encapsulates data such as time taken, attempts, hint usage, and word length,
 * and includes validation constraints to ensure proper input from the frontend.
 * Uses Bean Validation annotations for input validation.
 */
public class ScoreDTO {

    @NotBlank(message = "Nickname cannot be empty")
    private String nickname;

    @Min(value = 0, message = "Time taken cannot be negative")
    private int timeTakenMS;

    @PositiveOrZero(message = "Attempts must be positive")
    private int attempts;

    private boolean usedHint;

    @Positive(message = "Word length must be positive")
    private int wordLength;

    /**
     * Default constructor.
     */
    public ScoreDTO() {}

    /**
     * Constructs a ScoreDTO with all required game result fields.
     *
     * @param nickname     The player's nickname.
     * @param timeTakenMS  Time taken to finish the game (in milliseconds).
     * @param attempts     Number of attempts made.
     * @param usedHint     Whether the player used a hint.
     * @param wordLength   The length of the target word.
     */
    public ScoreDTO(String nickname, int timeTakenMS, int attempts, boolean usedHint, int wordLength) {
        this.nickname = nickname;
        this.timeTakenMS = timeTakenMS;
        this.attempts = attempts;
        this.usedHint = usedHint;
        this.wordLength = wordLength;
    }

    /**
     * Gets the player's nickname.
     *
     * @return Player's nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * Sets the player's nickname.
     *
     * @param nickname Player's nickname
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * Gets the time taken to complete the game.
     *
     * @return Time taken in milliseconds
     */
    public int getTimeTakenMS() {
        return timeTakenMS;
    }

    /**
     * Sets the time taken to complete the game.
     *
     * @param timeTakenMS Time in milliseconds
     */
    public void setTimeTakenMS(int timeTakenMS) {
        this.timeTakenMS = timeTakenMS;
    }

    /**
     * Gets the number of attempts the player used.
     *
     * @return Number of attempts
     */
    public int getAttempts() {
        return attempts;
    }

    /**
     * Sets the number of attempts the player used.
     *
     * @param attempts Number of attempts
     */
    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    /**
     * Checks if the player used a hint.
     *
     * @return true if hint was used, false otherwise
     */
    public boolean isUsedHint() {
        return usedHint;
    }

    /**
     * Sets whether the player used a hint.
     *
     * @param usedHint true if hint was used, false otherwise
     */
    public void setUsedHint(boolean usedHint) {
        this.usedHint = usedHint;
    }

    /**
     * Gets the length of the word used in the game.
     *
     * @return Word length
     */
    public int getWordLength() {
        return wordLength;
    }

    /**
     * Sets the length of the word used in the game.
     *
     * @param wordLength Word length
     */
    public void setWordLength(int wordLength) {
        this.wordLength = wordLength;
    }
}
