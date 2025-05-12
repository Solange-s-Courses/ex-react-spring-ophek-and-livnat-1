package com.example.backendex3.wordInit;


import com.example.backendex3.repositories.Score;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Utility class to initialize the scores file with sample data.
 * This class creates a new scores.ser file with initial leaderboard data.
 */
public class scoreInit {
    private static final String SCORES_FILE = "src/main/resources/scores.ser";

    public static void main(String[] args) {
        try {
            // Create some sample scores
            List<Score> scores = new ArrayList<>();
            scores.add(new Score("Champion1", 980));
            scores.add(new Score("WordMaster", 850));
            scores.add(new Score("GuessingPro", 720));
            scores.add(new Score("FastGuesser", 690));
            scores.add(new Score("WordNinja", 650));
            scores.add(new Score("LuckyPlayer", 600));
            scores.add(new Score("GameExpert", 580));
            scores.add(new Score("QuickGuesser", 530));
            scores.add(new Score("Wordsmith", 470));
            scores.add(new Score("Newbie", 320));

            // Sort scores in descending order
            scores.sort(Comparator.comparingInt(Score::getScore).reversed());

            // Write scores to file
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(SCORES_FILE))) {
                oos.writeObject(scores);
                System.out.println("Scores file initialized successfully with " + scores.size() + " entries.");
            }

        } catch (IOException e) {
            System.err.println("Error initializing scores file: " + e.getMessage());
            e.printStackTrace();
        }
    }
}