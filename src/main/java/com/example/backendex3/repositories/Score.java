package com.example.backendex3.repositories;
import java.io.Serializable;

/**
 * Represents a player's score entry for the leaderboard.
 * This class holds the player's nickname and their final calculated score.
 * It implements {@link Serializable} to support storage and retrieval using
 * object serialization mechanisms (e.g., ObjectOutputStream/ObjectInputStream).
 */
public class Score implements Serializable {

    private String nickname;      // Player's unique nickname
    private int score;            // Calculated score value

    /**
     * No-argument constructor required for deserialization.
     */
    public Score() {}

    /**
     * Constructs a new {@code Score} object with the specified nickname and score.
     *
     * @param nickname the player's nickname
     * @param score    the player's score
     */
    public Score(String nickname, int score) {
        setNickname(nickname);
        setScore(score);
    }

    /**
     * Returns the nickname of the player.
     *
     * @return the nickname
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * Sets the nickname of the player.
     *
     * @param nickname the new nickname
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * Returns the score of the player.
     *
     * @return the score
     */
    public int getScore() {
        return score;
    }

    /**
     * Sets the score of the player.
     *
     * @param score the new score
     */
    public void setScore(int score) {
        this.score = score;
    }

}