package dao;

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

        synchronized (words) {
            File file = new File(WORD_FILE);
            if (file.exists()) {
                try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
                    List<WordEntry> loadedWords = (List<WordEntry>) ois.readObject();
                    words.clear();
                    words.addAll(loadedWords);
                }
                catch (IOException | ClassNotFoundException e) {
                    System.err.println("Error loading words: " + e.getMessage());
                    words.clear();
                }
            }
            else {
                words.clear();
            }
        }
    }


    public WordEntry getWord(String word) {

        synchronized (words) {

            WordEntry wordEntry = null;
            for (WordEntry entry : words) {
                if (entry.getWord().equals(word)) {
                    wordEntry = new WordEntry(entry.getCategory(),entry.getWord(), entry.getHint());
                    break;
                }
            }
            return wordEntry;
        }

    }

    // pass the old word - means we have to save it when the user clicks the edit option!
    // it'll be in the body of the put api request!!
    public WordEntry updateWord (WordEntry wordEntry, String oldWord) {

        synchronized (words) {
            for (WordEntry entry : words) {

                // since the word is unique we search for it
                if (entry.getWord().equals(oldWord)) {
                    entry.updateWord(wordEntry);
                    // maybe try adding a method in entry that updates by getting the entry and coping
//                    entry.setCategory(wordEntry.getCategory());
//                    entry.setHint(wordEntry.getHint());
//                    entry.setWord(wordEntry.getWord());
                    break;
                }
            }

        }
        return wordEntry;
    }

    public ArrayList<WordEntry> getWords() {
        return new ArrayList<>(words);
    }

    public void addWord(WordEntry wordEntry) {
        synchronized (words) {

            //checking if words contains that word, since the word has to be unique
            for (WordEntry entry : words) {
                if (entry.getWord().equals(wordEntry.getWord())) {
                    return;
                }
            }
            words.add(wordEntry);

        }
    }

    public void removeWord(WordEntry wordEntry) {
        synchronized (words) {
            words.removeIf(entry -> entry.getWord().equals(wordEntry.getWord()));
        }
    }

    // function that saves the wi=ords into word.ser
    public void saveWords() {
        synchronized (words) {
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(WORD_FILE))) {
                oos.writeObject(words);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save words", e);
            }
        }
    }
}


