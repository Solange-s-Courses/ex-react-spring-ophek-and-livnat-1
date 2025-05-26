package com.example.backendex3.repositories;

import org.springframework.stereotype.Repository;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Repository for managing a collection of {@link WordEntry} objects.
 * Word entries are stored in-memory and persisted to a serialized file on disk.
 * This class provides thread-safe CRUD operations (create, read, update, delete)
 * and handles serialization/deserialization of the word list.
 */
@Repository
public class WordRepository {

    private static final String WORD_FILE = "src/main/resources/words.ser";
    private static final List<WordEntry> words = new ArrayList<>();

    /**
     * Initializes the repository by attempting to load existing word entries from file.
     */
    public WordRepository() {
        loadWords();
    }

    /**
     * Loads word entries from the serialized file.
     * If the file doesn't exist, the list remains empty.
     * Any deserialization or I/O errors result in a runtime exception.
     */
    @SuppressWarnings("unchecked")
    private void loadWords() {

        File file = new File(WORD_FILE);
        if (!file.exists()) return;

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            List<WordEntry> loadedWords = (List<WordEntry>) ois.readObject();
            synchronized (words) {
                words.clear();
                words.addAll(loadedWords);
            }
        }
        catch (IOException e){
            throw new RuntimeException("Error loading words from file: " + e.getMessage(), e);
        }
        catch (ClassNotFoundException e) {
            throw new RuntimeException("Error deserializing word data: " + e.getMessage(), e);
        }
    }

    /**
     * Finds a word entry by its word value
     *
     * @param word The word to search for (assumed to be already lowercase)
     * @return The matching {@link WordEntry}, or {@code null} if not found.
     */
    public WordEntry findByWord(String word) {
        synchronized (words) {
            for (WordEntry entry : words) {
                if (entry.getWord().equals(word)) {
                    return entry;
                }
            }
            return null;
        }
    }

    /**
     * Finds a word entry by its unique ID.
     *
     * @param id The ID to search for.
     * @return The matching {@link WordEntry}, or {@code null} if not found.
     */
    public WordEntry findById(String id) {
        synchronized (words) {
            for (WordEntry entry : words) {
                if (entry.getId().equals(id)) {
                    return entry;
                }
            }
            return null;
        }
    }

    /**
     * Retrieves all word entries belonging to a specific category.
     *
     * @param category The category to filter by.
     * @return A list of matching {@link WordEntry} objects.
     */
    public List<WordEntry> findByCategory(String category) {

        List<WordEntry> foundWords = new ArrayList<>();

        synchronized (words) {
            for (WordEntry entry : words) {
                if (entry.getCategory().equals(category)) {
                    foundWords.add(entry);
                }
            }
        }

        return foundWords;
    }

    /**
     * Updates an existing word entry by its ID.
     *
     * @param id           The ID of the word entry to update.
     * @param updatedEntry The new values to apply.
     * @return {@code true} if the entry was found and updated; {@code false} otherwise.
     */
    public boolean updateById(String id, WordEntry updatedEntry) {
        synchronized (words) {
            for (WordEntry entry : words) {
                if (entry.getId().equals(id)) {
                    entry.updateWord(updatedEntry);
                    saveToFile();
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * Returns a copy of all stored word entries.
     *
     * @return A new {@link ArrayList} containing all {@link WordEntry} objects.
     */
    public ArrayList<WordEntry> getWords() {
        synchronized (words) {
            return new ArrayList<>(words);
        }
    }

    /**
     * Deletes a word entry by its ID.
     *
     * @param id The ID of the word to delete.
     * @return true if deletion was successful, false if not found
     */
    public boolean deleteById(String id) {
        synchronized (words) {
            boolean removed = words.removeIf(entry -> entry.getId().equals(id));
            if (removed) {
                saveToFile();
            }
            return removed;
        }
    }

    /**
     * Serializes and saves the current list of words to the file.
     * @throws RuntimeException if the operation fails.
     */
    public void saveToFile() throws RuntimeException {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(WORD_FILE))) {
            synchronized (words) {
                oos.writeObject(words);
            }
        }
        catch (IOException e) {
            throw new RuntimeException("Failed to save words to file: " + e.getMessage(), e);
        }
    }

    /**
     * Adds a new word entry to the repository and persists it to file.
     *
     *@param wordEntry The {@link WordEntry} to add.
     */
    public void addWord(WordEntry wordEntry) {
        synchronized (words) {
            words.add(wordEntry);
            saveToFile();
        }
    }
}

