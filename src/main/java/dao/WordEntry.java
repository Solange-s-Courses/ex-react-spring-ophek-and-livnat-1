package dao;

import static utils.ValidationUtil.*;
import java.io.Serializable;

public class WordEntry implements Serializable {

    private String category;
    private String word;
    private String hint;

    public WordEntry(){}

    public WordEntry(String category, String word, String hint) {

        checkNotEmpty(category);
        checkNotEmpty(word);
        checkNotEmpty(hint);
        checkIsAlphabetic(category);
        checkIsAlphabetic(word);
        this.category = category.toLowerCase();
        this.word = word.toLowerCase();
        this.hint = hint;
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

    public void updateWord(WordEntry other) {
        setWord(other.getWord());
        setHint(other.getHint());
        setCategory(other.getCategory());
    }
}
