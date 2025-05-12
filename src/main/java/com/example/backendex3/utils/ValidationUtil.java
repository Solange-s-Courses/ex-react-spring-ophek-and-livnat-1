package com.example.backendex3.utils;

public final class ValidationUtil {

    // Private constructor to prevent instantiation
    private ValidationUtil() {}

    public static void checkNotEmpty(String s) {
        if (s == null || s.isEmpty()) {
            throw new IllegalArgumentException("Empty argument");
        }
    }

    public static void checkIsAlphabetic(String s) {
        if (!s.matches("[a-zA-Z]+")) {
            throw new IllegalArgumentException("String must contain only alphabetic characters (a–z or A–Z)");
        }
    }

    public static void checkIsValidScore(int score) {
        if (score < 0) {
            throw new IllegalArgumentException("Score cannot be negative");
        }
    }


    /**
     * Validates that a time value is non-negative.
     *
     * @param time The time value to validate
     * @throws IllegalArgumentException if the time is negative
     */
    public static void checkIsValidTime(int time) {
        if (time < 0) {
            throw new IllegalArgumentException("Time cannot be negative");
        }
    }

    /**
     * Validates that an attempts count is positive.
     *
     * @param attempts The attempts count to validate
     * @throws IllegalArgumentException if the attempts count is not positive
     */
    public static void checkIsValidAttempts(int attempts) {
        if (attempts <= 0) {
            throw new IllegalArgumentException("Attempts must be positive");
        }
    }

    /**
     * Validates that a word length is positive.
     *
     * @param length The word length to validate
     * @throws IllegalArgumentException if the length is not positive
     */
    public static void checkIsValidWordLength(int length) {
        if (length <= 0) {
            throw new IllegalArgumentException("Word length must be positive");
        }
    }
}