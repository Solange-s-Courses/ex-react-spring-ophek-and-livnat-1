package repositories;

import static utils.ValidationUtil.*;
import java.io.Serializable;

/**
 * Represents a word entry containing a category, the word itself, and a hint.
 * Implements validation on all fields.
 */
public class WordEntry implements Serializable {

    private String category;
    private String word;
    private String hint;

    public WordEntry(){}

    /**
     * Constructs a WordEntry with the given values after validation.
     *
     * @param category The word's category.
     * @param word     The word.
     * @param hint     The hint for the word.
     * @throws IllegalArgumentException if any parameter is empty or invalid.
     */
    public WordEntry(String category, String word, String hint) {
        setWord(word);
        setCategory(category);
        setHint(hint);
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        checkNotEmpty(category);
        this.category = category;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        checkNotEmpty(word);
        checkIsAlphabetic(word);
        this.word = word;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        checkNotEmpty(hint);
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
