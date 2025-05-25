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
        words.add(new WordEntry("vehicles", "bicycle", "Two-wheeled pedal transport"));
        words.add(new WordEntry("vehicles", "submarine", "Underwater vessel"));
        words.add(new WordEntry("sports", "soccer", "Played with a round ball"));
        words.add(new WordEntry("sports", "tennis", "Played with rackets"));
        words.add(new WordEntry("instruments", "piano", "Keyboard musical instrument"));
        words.add(new WordEntry("instruments", "violin", "String instrument played with a bow"));
        words.add(new WordEntry("planets", "mars", "Known as the red planet"));
        words.add(new WordEntry("planets", "jupiter", "Largest planet in the solar system"));
        words.add(new WordEntry("foods", "pizza", "Popular Italian dish with cheese"));
        words.add(new WordEntry("foods", "sushi", "Japanese dish with rice and fish"));

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("src/main/resources/words.ser"))) {
            out.writeObject(words);
            System.out.println("words.ser created successfully with " + words.size() + " words.");
        }
        catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
    }
}
