package services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repositories.WordEntry;
import repositories.WordRepository;

import java.util.List;


@Service
public class WordService {

    private final WordRepository wordRepository;

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    /**
     * Gets a word entry by its word value
     * @param word The word to search for
     * @return The word entry if found, null otherwise
     */
    public WordEntry getWord(String word) {

        if (word == null || word.isEmpty()) return null;
        return wordRepository.findByWord(word.toLowerCase());
    }

    /**
     * Gets all word entries
     * @return List of all word entries
     */
    public List<WordEntry> getAllWords() {
        return wordRepository.getWords();
    }

    /**
     * Adds a new word if it doesn't exist already
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
        wordRepository.addWord(wordEntry);
        return true;
    }


    public WordEntry updateWord(WordEntry updatedWord, String oldWord) {
        if (updatedWord == null || oldWord == null || oldWord.isEmpty()) {
            throw new IllegalArgumentException("Invalid arguments");
        }

        String normalizedOldWord = oldWord.toLowerCase();
        String newWord = updatedWord.getWord().toLowerCase();

        // check if the new word already exists
        if (!normalizedOldWord.equals(newWord)) {
            if (wordRepository.findByWord(newWord) != null) {
                return null; // conflict since there's already a word with the wanted value
            }
        }

        boolean success = wordRepository.update(normalizedOldWord, updatedWord);
        return success? updatedWord : null;
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

}
