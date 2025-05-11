package repositories;

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
        catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading words: " + e.getMessage());
        }
    }

    /**
     * Finds a word entry by its word value
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
     * Updates an existing word entry
     * @param oldWord The word to update (assumed to be already lowercase)
     * @param updatedEntry The updated entry data
     * @return true if update was successful, false if entry wasn't found
     */
    public boolean update(String oldWord, WordEntry updatedEntry) {

        synchronized (words) {
            for (WordEntry entry : words) {
                if (entry.getWord().equals(oldWord)) {
                    entry.updateWord(updatedEntry);
                    saveToFile();
                    return true;
                }
            }
            return false;
        }
    }

    /**
     * Returns all word entries
     * @return A new ArrayList containing all words
     */
    public ArrayList<WordEntry> getWords() {
        synchronized (words) {
            return new ArrayList<>(words);
        }
    }

    /**
     * Deletes a word entry
     * @param word The word to delete (assumed to be already lowercase)
     */
    public void delete(String word) {

        synchronized (words) {
            words.removeIf(entry -> entry.getWord().equals(word));
            saveToFile();
        }
    }

    /**
     * Persists the words to the file
     */
    public void saveToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(WORD_FILE))) {
            synchronized (words) {
                oos.writeObject(words);
            }
        }
        catch (IOException e) {
                throw new RuntimeException("Failed to save words", e);
        }
    }

    /**
     * Saves a new word entry only if unique
     * @param wordEntry The word entry to save
     * @throws IllegalArgumentException if wordEntry is null
     */
    public void addWord(WordEntry wordEntry) {
        synchronized (words) {
            words.add(wordEntry);
            saveToFile();
        }
    }
}

