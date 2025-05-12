package com.example.backendex3.wordInit;
import com.example.backendex3.repositories.WordEntry;

import java.io.*;
import java.util.*;

public class WordInit implements Serializable {

    public static void main(String[] args) {

        List<WordEntry> words = new ArrayList<>();

        words.add(new WordEntry("animals", "tiger", "Big striped cat"));
        words.add(new WordEntry("animals", "eagle", "Flying predator"));
        words.add(new WordEntry("colors", "blue", "Color of the sky"));
        words.add(new WordEntry("colors", "green", "Color of grass"));
        words.add(new WordEntry("fruits", "banana", "Yellow fruit"));
        words.add(new WordEntry("fruits", "apple", "Keeps the doctor away"));
        words.add(new WordEntry("jobs", "doctor", "Heals people"));
        words.add(new WordEntry("jobs", "teacher", "Works in a school"));
        words.add(new WordEntry("countries", "france", "Known for the Eiffel Tower"));
        words.add(new WordEntry("countries", "canada", "Has maple syrup"));

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("src/main/resources/words.ser"))) {
            out.writeObject(words);
            System.out.println("words.ser created successfully with " + words.size() + " words.");
        }
        catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
    }
}
