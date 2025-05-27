package com.example.backendex3.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.example.backendex3.repositories.WordEntry;
import com.example.backendex3.repositories.WordRepository;

import java.util.*;

/**
 * Service class that provides business logic for handling WordEntry objects.
 * This includes operations such as retrieving, adding, updating, and deleting word entries,
 * as well as retrieving word categories and saving changes to persistent storage.
 */
@Service
public class WordService {

    private final WordRepository wordRepository;
    private final Random random = new Random();

    /**
     * Constructs a new WordService with the given WordRepository.
     *
     * @param wordRepository the repository used for accessing word data
     */
    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    /**
     * Retrieves a random word entry from a given category.
     *
     * @param category the category from which to pick a random word
     * @return a random WordEntry from the specified category, or null if none found
     * @throws IllegalArgumentException if category is null or empty
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
     * Retrieves all word entries sorted lexicographically (case-insensitive).
     *
     * @return a list of all WordEntry objects sorted by word
     */
    public List<WordEntry> getAllWords() {
        List<WordEntry> allWords = wordRepository.getWords();

        // Sort the list by the word field in lexicographic order (case-insensitive)
        allWords.sort(Comparator.comparing(word -> word.getWord().toLowerCase()));
        return allWords;
    }

    /**
     * Retrieves a word entry by its word value.
     *
     * @param word the word to search for
     * @return the matching WordEntry if found, or null otherwise
     * @throws IllegalArgumentException if word is null or empty
     */
    public WordEntry getWord(String word) {

        if (word == null || word.isEmpty()) {
            throw new IllegalArgumentException("Invalid word");
        }
        return wordRepository.findByWord(word.toLowerCase());
    }

    /**
     * Retrieves a word entry by its unique ID.
     *
     * @param id the ID of the word to retrieve
     * @return the matching WordEntry if found, or null otherwise
     */
    public WordEntry getWordById(String id) {
        return wordRepository.findById(id);
    }

    /**
     * Adds a new word entry if it does not already exist.
     *
     * @param wordEntry the WordEntry to add
     * @return true if the word was added successfully, false otherwise
     * @throws IllegalArgumentException if the entry is null, invalid, or the word already exists
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
     * Updates an existing word entry identified by its ID.
     *
     * @param id           the ID of the word entry to update
     * @param updatedEntry the updated WordEntry object
     * @return the updated WordEntry if the update was successful, null otherwise
     * @throws ResponseStatusException if no word is found with the given ID
     * @throws IllegalArgumentException if trying to update to a word that already exists
     */
    public WordEntry updateWordById(String id, WordEntry updatedEntry) {

        WordEntry existingEntry = wordRepository.findById(id);
        if (existingEntry == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "word no longer exists");
        }

        String newWord = updatedEntry.getWord().toLowerCase();
        String existingWord = existingEntry.getWord().toLowerCase();

        if (!newWord.equals(existingWord)) {
            if ( wordRepository.findByWord(newWord) != null ) {
                throw new IllegalArgumentException("Word already exists");
            }
        }

        updatedEntry.setWord(newWord);
        updatedEntry.setCategory(updatedEntry.getCategory().toLowerCase());
        updatedEntry.setId(id);

        boolean updated = wordRepository.updateById(id, updatedEntry);
        return updated ? updatedEntry : null;
    }

    /**
     * Removes a word entry by its ID.
     *
     * @param id the ID of the word entry to remove
     * @return true if the entry was removed successfully, false otherwise
     */
    public boolean removeWordById(String id) {
        return wordRepository.deleteById(id);
    }

    /**
     * Retrieves a list of all unique word categories.
     *
     * @return {@code List<String>} list of category names
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
