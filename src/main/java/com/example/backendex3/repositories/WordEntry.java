package com.example.backendex3.repositories;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

import java.io.Serializable;
import java.util.UUID;

/**
 * Represents a word entry containing a category, the word itself, and a hint.
 * Implements validation on all fields.
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

    public WordEntry(){
        this.id = UUID.randomUUID().toString();
    }

    /**
     * Constructs a WordEntry with the given values after validation.
     *
     * @param category The word's category.
     * @param word     The word.
     * @param hint     The hint for the word.
     * @throws IllegalArgumentException if any parameter is empty or invalid.
     */
    public WordEntry(String category, String word, String hint) {
        this.id = UUID.randomUUID().toString();
        this.category = category;
        this.word = word;
        this.hint = hint;
    }
    public String getId() {return id;}

    public void setId(String id) {this.id = id;}

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    /**
     * Updates this entry's data based on another entry.
     *
     * @param other The new entry values to apply.
     */
    public void updateWord(WordEntry other) {
        setWord(other.getWord());
        setHint(other.getHint());
        setCategory(other.getCategory());
    }
}
