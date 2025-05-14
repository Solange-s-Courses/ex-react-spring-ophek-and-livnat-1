package com.example.backendex3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.backendex3.repositories.WordEntry;
import com.example.backendex3.repositories.WordRepository;

import java.util.*;


@Service
public class WordService {

    private final WordRepository wordRepository;
    private final Random random = new Random();

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    /**
     * Gets a random word entry
     * @return a word entry if there's any, null otherwise
     */
    public WordEntry getRandomWordByCategory(String category) {

        if (category == null || category.isEmpty()) {
            throw new IllegalArgumentException("Invalid category");
        }

        List<WordEntry> categoryList = wordRepository.findByCategory(category.toLowerCase());
        if (categoryList.isEmpty()) return null;

        return categoryList.get(random.nextInt(categoryList.size()));
    }

    /**
     * Gets all word entries
     * @return List of all word entries
     */
    public List<WordEntry> getAllWords() {
        return wordRepository.getWords();
    }

    /**
     * Gets a word entry by its word value
     * @param word The word to search for
     * @return The word entry if found, null otherwise
     */
    public WordEntry getWord(String word) {

        if (word == null || word.isEmpty()) {
            throw new IllegalArgumentException("Invalid word");
        }
        return wordRepository.findByWord(word.toLowerCase());
    }

    /**
     * Adds a new word if it doesn't exist already
     *
     * @param wordEntry The word entry to add
     * @return true if word was added, false if it already exists
     * @throws IllegalArgumentException if validation fails
     */
    public boolean addWord(WordEntry wordEntry) {

        if (wordEntry == null || wordEntry.getWord() == null) {
            throw new IllegalArgumentException("Invalid Word entry");
        }

        if (wordRepository.findByWord(wordEntry.getWord().toLowerCase()) != null) {
            throw new IllegalArgumentException("Word already exists");
        }

        wordEntry.setWord(wordEntry.getWord().toLowerCase());
        wordEntry.setCategory(wordEntry.getCategory().toLowerCase());
        wordRepository.addWord(wordEntry);
        return true;
    }

    /**
     * Updates an existing word entry, optionally changing the word.
     *
     * @param updatedWord The updated WordEntry.
     * @param oldWord The original word to be replaced.
     * @return The updated WordEntry if the update succeeded, or null if the new word conflicts with an existing one or
     * if the update failed.
     * @throws IllegalArgumentException if arguments are null or empty.
     */
    public WordEntry updateWord(WordEntry updatedWord, String oldWord) {
        if (updatedWord == null || oldWord == null || oldWord.isEmpty()) {
            throw new IllegalArgumentException("Invalid arguments");
        }

        String normalizedOldWord = oldWord.toLowerCase();
        String newWord = updatedWord.getWord().toLowerCase();

        // check if the new word already exists
        if (!normalizedOldWord.equals(newWord)) {
            if (wordRepository.findByWord(newWord) != null) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Word already exists");  // Throw conflict exception
            }
        }

        boolean success = wordRepository.update(normalizedOldWord, updatedWord);
        if (!success) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update word");  // If update fails
        }

        return updatedWord;  // Success
    }

    /**
     * Removes a word entry
     * @param word The word to remove
     * @return true if word was removed, false if it didn't exist
     * @throws IllegalArgumentException if word is null or empty
     */
    public boolean removeWord(String word) {
        if (word == null || word.isEmpty()) {
            throw new IllegalArgumentException("Word cannot be null or empty");
        }

        if (wordRepository.findByWord(word.toLowerCase()) == null) {
            return false;
        }

        wordRepository.delete(word.toLowerCase());
        return true;
    }

    /**
     * Saves all changes to persistent storage
     */
    public void saveChanges() {
        wordRepository.saveToFile();
    }

    /**
     * Retrieves all categories
     * @return List<String> list of categories
     * @throws IllegalArgumentException if word is null or empty
     */
    public List<String> getCategories() {
        List<WordEntry> allWords = getAllWords();
        Set<String> categoriesSet = new HashSet<>();

        for (WordEntry entry: allWords) {
            categoriesSet.add(entry.getCategory());
        }
        return new ArrayList<>(categoriesSet);
    }

}
