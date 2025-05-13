package com.example.backendex3.repositories;
import java.io.Serializable;

/**
 * Represents a player's score entry for the leaderboard.
 * This class is serializable to allow storage using ObjectStreams.
 */
public class Score implements Serializable {
    private String nickname;      // Player's unique nickname
    private int score;            // Calculated score value

    // Default constructor for serialization
    public Score() {}

    /**
     * Creates a new score entry with nickname and score.
     *
     * @param nickname Player's unique nickname
     * @param score Calculated final score
     */
    public Score(String nickname, int score) {
        setNickname(nickname);
        setScore(score);
    }

    // Getters and setters
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

}