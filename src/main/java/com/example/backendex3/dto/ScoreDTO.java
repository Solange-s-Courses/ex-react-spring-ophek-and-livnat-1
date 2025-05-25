package com.example.backendex3.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

/**
 * Data Transfer Object for game statistics and score calculation.
 * Used to transfer game results from the frontend to the backend.
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

    // Default constructor
    public ScoreDTO() {}

    /**
     * Creates a new ScoreDTO with all game statistics
     *
     * @param nickname Player's unique nickname
     * @param timeTakenMS Time taken to complete the game in seconds
     * @param attempts Number of attempts made by the player
     * @param usedHint Whether the player used a hint
     * @param wordLength Length of the word
     */
    public ScoreDTO(String nickname, int timeTakenMS, int attempts, boolean usedHint, int wordLength) {
        this.nickname = nickname;
        this.timeTakenMS = timeTakenMS;
        this.attempts = attempts;
        this.usedHint = usedHint;
        this.wordLength = wordLength;
    }

    // Getters and setters
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getTimeTakenMS() {
        return timeTakenMS;
    }

    public void setTimeTakenMS(int timeTakenMS) {
        this.timeTakenMS = timeTakenMS;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
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
        this.wordLength = wordLength;
    }
}
