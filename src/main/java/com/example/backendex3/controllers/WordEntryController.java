package com.example.backendex3.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.example.backendex3.repositories.WordEntry;
import com.example.backendex3.services.WordService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for managing word entries.
 * Provides endpoints for CRUD operations and querying word data by category or word value.
 */
@RestController
@RequestMapping("/wordEntry")
public class WordEntryController {

    private final WordService wordService;

    /**
     * Constructor for dependency injection of the WordService.
     *
     * @param wordService Service used for managing word entries
     */
    @Autowired
    public WordEntryController(WordService wordService) {
        this.wordService = wordService;
    }

    /**
     * Returns all word entries stored in the system.
     *
     * @return List of all {@link WordEntry} objects
     */
    @GetMapping(value="")
    public List<WordEntry> getRoot() {
        return wordService.getAllWords();
    }

    /**
     * Returns a random word entry by category.
     *
     * @param category Category to filter words
     * @return A randomly selected {@link WordEntry} from the specified category
     * @throws ResponseStatusException if no words are found in the category
     */
    @GetMapping("/getRandomWord")
    public WordEntry getWordEntry(@RequestParam String category) {
        WordEntry randomWord = wordService.getRandomWordByCategory(category);
        if (randomWord == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No words found in category: " + category);
        }
        return randomWord;
    }

    /**
     * Adds a new word entry to the system.
     *
     * @param entry Word entry to add (must be valid)
     * @return The added {@link WordEntry} wrapped in a ResponseEntity
     */
    @PostMapping("/add")
    public ResponseEntity<WordEntry> addWord(@Valid @RequestBody final WordEntry entry) {
        boolean added = wordService.addWord(entry);
        return ResponseEntity.ok(entry);
    }

    /**
     * Updates an existing word entry by its unique ID.
     *
     * @param id ID of the word to update
     * @param entry New word entry data
     * @return The updated {@link WordEntry}
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<WordEntry> updateWord(@PathVariable("id") final String id, @Valid @RequestBody final WordEntry entry) {
        WordEntry updated = wordService.updateWordById(id, entry);
        return ResponseEntity.ok(updated);
    }

    /**
     * Deletes a word entry by its unique ID.
     *
     * @param id ID of the word to delete
     * @return HTTP 200 OK if deleted successfully
     * @throws IllegalArgumentException if the word was already deleted
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteWord(@PathVariable("id") final String id) {
        boolean removed = wordService.removeWordById(id);
        if (!removed) {
            throw new IllegalArgumentException("Word was already deleted by another user");
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    /**
     * Checks if a word entry exists in the system.
     *
     * @param word The word to check
     * @return A map with a single key "exists" indicating true or false
     */
    @GetMapping("/word/{word}/exists")
    public ResponseEntity<Map<String, Boolean>> checkWordExists(@PathVariable("word") final String word) {
        boolean exists = wordService.getWord(word) != null;
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves all distinct categories from word entries.
     *
     * @return List of category names
     */
    @GetMapping("/getCategories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = wordService.getCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.ok(new ArrayList<>());
        }
        return ResponseEntity.ok(categories);
    }
}
