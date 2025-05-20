package com.example.backendex3.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.example.backendex3.repositories.WordEntry;
import com.example.backendex3.services.WordService;

import java.util.List;

@RestController
@RequestMapping("/wordEntry")
public class WordEntryController {

    private final WordService wordService;

    @Autowired
    public WordEntryController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping(value="")
    public List<WordEntry> getRoot() {
        return wordService.getAllWords();
    }

    @GetMapping("/getRandomWord")
    public WordEntry getWordEntry(@RequestParam String category) {
        WordEntry randomWord = wordService.getRandomWordByCategory(category);
        if (randomWord == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No words found in category: " + category);
        }
        return randomWord;
    }

    @PostMapping("/add")
    public ResponseEntity<WordEntry> addWord(@Valid @RequestBody final WordEntry entry) {
        boolean added = wordService.addWord(entry);
//        if (!added) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Word already exists");
//        }
        return ResponseEntity.ok(entry);
    }

//    @PutMapping("/update/{word}")
//    public ResponseEntity<HttpStatus> updateWord(@Valid @PathVariable("word") final String word, @RequestBody final WordEntry entry) {
//
//        WordEntry oldEntry = wordService.getWord(word);
//
//        if (oldEntry != null) {
//            WordEntry updated = wordService.updateWord(entry, oldEntry.getWord());
//            return ResponseEntity.ok(HttpStatus.OK);
//        }
//        else {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Word not found");
//        }
//    }
    @PutMapping("/update/{id}")
    public ResponseEntity<WordEntry> updateWord(@PathVariable("id") final String id, @Valid @RequestBody final WordEntry entry) {
        WordEntry updated = wordService.updateWordById(id, entry);
//        if (updated == null) {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Word not found with ID: " + id);
//        }
        return ResponseEntity.ok(updated);
    }

//    @DeleteMapping("/delete/{word}")
//    public ResponseEntity<HttpStatus> deleteWord(@PathVariable("word") final String word) {
//        boolean removed = wordService.removeWord(word);
//        if (!removed) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Word entry wasn't removed");
//        }
//        return ResponseEntity.ok(HttpStatus.OK);  // Success: Word deleted
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteWord(@PathVariable("id") final String id) {
        boolean removed = wordService.removeWordById(id);
        if (!removed) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Word entry not found with ID: " + id);
        }
        return ResponseEntity.ok(HttpStatus.OK);  // Success: Word deleted
    }


    @PostMapping("/save")
    public ResponseEntity<HttpStatus> save() {
        wordService.saveChanges();
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WordEntry> getWordById(@PathVariable("id") final String id) {
        WordEntry entry = wordService.getWordById(id);
        if (entry == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Word not found with ID: " + id);
        }
        return ResponseEntity.ok(entry);
    }

    @GetMapping("/word/{word}")
    public WordEntry getEntryByWord(@PathVariable("word") final String word) {
        WordEntry entry = wordService.getWord(word);
        if (entry == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "No entry found for this word: " + word);
        }
        return entry;
    }

    @GetMapping("/getCategories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = wordService.getCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build(); // HTTP 204
        }
        return ResponseEntity.ok(categories);

    }
}
