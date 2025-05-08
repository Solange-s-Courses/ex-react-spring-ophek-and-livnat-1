package dao;

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


    public void checkNotEmpty(String s) {
        if (s == null || s.isEmpty()) {
            throw new IllegalArgumentException("Empty argument");
        }
    }

    public void checkIsAlphabetic(String s) {
        if (!s.matches("[a-zA-Z]+")) {
            throw new IllegalArgumentException("String must contain only alphabetic characters (a–z or A–Z)");
        }
    }


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
}
