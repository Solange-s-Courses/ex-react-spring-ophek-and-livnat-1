package com.example.backendex3.repositories;

import org.springframework.stereotype.Repository;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


@Repository
public class WordRepository {

    private static final String WORD_FILE = "src/main/resources/words.ser";
    private static final List<WordEntry> words = new ArrayList<>();

    public WordRepository() {
        loadWords();
    }

    /**
     * Loads the words from the serialized file.
     * If the file doesn't exist or there's an error, initializes with an empty list.
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
     * @return The word entry if found, null otherwise
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
     * Finds a word entry by its ID
     *
     * @param id The ID to search for
     * @return The word entry if found, null otherwise
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
     * Updates an existing word entry by ID
     *
     * @param id The ID of the word to update
     * @param updatedEntry The updated entry data
     * @return true if update was successful, false if entry wasn't found
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

//    /**
//     * Updates an existing word entry
//     *
//     * @param oldWord The word to update (assumed to be already lowercase)
//     * @param updatedEntry The updated entry data
//     * @return true if update was successful, false if entry wasn't found
//     */
//    public boolean update(String oldWord, WordEntry updatedEntry) {
//
//        synchronized (words) {
//            for (WordEntry entry : words) {
//                if (entry.getWord().equals(oldWord)) {
//                    entry.updateWord(updatedEntry);
//                    saveToFile();
//                    return true;
//                }
//            }
//            return false;
//        }
//    }

    /**
     * Returns all word entries
     *
     * @return A new ArrayList containing all words
     */
    public ArrayList<WordEntry> getWords() {
        synchronized (words) {
            return new ArrayList<>(words);
        }
    }

    /**
     * Deletes a word entry by ID
     *
     * @param id The ID of the word to delete
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

//    /**
//     * Deletes a word entry
//     *
//     * @param word The word to delete (assumed to be already lowercase)
//     */
//    public void delete(String word) {
//
//        synchronized (words) {
//            words.removeIf(entry -> entry.getWord().equals(word));
//            saveToFile();
//        }
//    }

    /**
     * Persists the words to the file
     * @throws RuntimeException if there's an error saving to file
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
     * Saves a new word entry
     *
     * @param wordEntry The word entry to save
     */
    public void addWord(WordEntry wordEntry) {
        synchronized (words) {
            words.add(wordEntry);
            saveToFile();
        }
    }
}

