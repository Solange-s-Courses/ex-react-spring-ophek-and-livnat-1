package utils;

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
            throw new IllegalArgumentException("Score must be non-negative");
        }
    }
}