package com.example.backendex3.repositories;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;
import java.util.UUID;

/**
 * Represents a word entry used in the game, containing a unique ID, category, word, and hint.
 * Validation constraints:
 * Category and word must be non-empty and contain only alphabetic characters (a–z or A–Z).
 * Hint must be non-empty.
 */
public class WordEntry implements Serializable {

    private String id;

    @NotEmpty
    @Pattern(regexp = "[a-zA-Z]+", message="Category must contain only alphabetic characters (a–z or A–Z)")
    private String category;

    @NotEmpty
    @Pattern(regexp = "[a-zA-Z]+", message="Word must contain only alphabetic characters (a–z or A–Z)")
    private String word;

    @NotEmpty
    private String hint;

    /**
     * Default constructor that initializes the entry with a randomly generated UUID.
     */
    public WordEntry(){
        this.id = UUID.randomUUID().toString();
    }

    /**
     * Constructs a WordEntry with the specified category, word, and hint.
     * A unique ID is automatically generated.
     *
     * @param category The category of the word (must be alphabetic).
     * @param word     The word itself (must be alphabetic).
     * @param hint     A hint associated with the word (must not be empty).
     * @throws IllegalArgumentException if any parameter is invalid or null (validation annotations enforce this).
     */
    public WordEntry(String category, String word, String hint) {
        this.id = UUID.randomUUID().toString();
        this.category = category;
        this.word = word;
        this.hint = hint;
    }

    /**
     * Returns the unique identifier of this word entry.
     *
     * @return UUID string of the word entry.
     */
    public String getId() {return id;}

    /**
     * Sets the unique identifier for this word entry.
     *
     * @param id A string representing the UUID to assign.
     */
    public void setId(String id) {this.id = id;}

    /**
     * Returns the category of the word.
     *
     * @return The category string.
     */
    public String getCategory() {
        return category;
    }

    /**
     * Sets the category for this word entry.
     *
     * @param category A string containing only alphabetic characters.
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * Returns the word of this entry.
     *
     * @return The word string.
     */
    public String getWord() {
        return word;
    }

    /**
     * Sets the word for this entry.
     *
     * @param word A string containing only alphabetic characters.
     */
    public void setWord(String word) {
        this.word = word;
    }

    /**
     * Returns the hint for the word.
     *
     * @return A hint string.
     */
    public String getHint() {
        return hint;
    }

    /**
     * Sets the hint for the word.
     *
     * @param hint A non-empty hint string.
     */
    public void setHint(String hint) {
        this.hint = hint;
    }

    /**
     * Updates the category, word, and hint of this entry using values from another WordEntry.
     *
     * @param other Another WordEntry instance whose values will be copied to this entry.
     */
    public void updateWord(WordEntry other) {
        setWord(other.getWord());
        setHint(other.getHint());
        setCategory(other.getCategory());
    }
}
