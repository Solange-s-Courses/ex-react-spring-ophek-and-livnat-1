package controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import repositories.WordEntry;
import services.WordService;

import java.util.List;

@RestController
@RequestMapping("/wordEntry")
public class WordEntryController {

    private final WordService wordService;

    public WordEntryController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping(value="")
    public List<WordEntry> getRoot() {
        return wordService.getAllWords();
    }

    @GetMapping("/getRandomWord")
    public WordEntry getWordEntry(@RequestParam String category) {
        return wordService.getRandomWordByCategory(category);
    }

    @PostMapping("/add")
    public ResponseEntity<WordEntry> addWord(@RequestBody final WordEntry entry) {
        boolean added = wordService.addWord(entry);
        if (!added) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Word already exists");
        }
        return ResponseEntity.ok(entry);
    }

    @PutMapping("/update/{word}")
    public ResponseEntity<HttpStatus> updateWord(@PathVariable("word") final String word, @RequestBody final WordEntry entry) {

        WordEntry oldEntry = wordService.getWord(word);

        if (oldEntry != null) {
            try {
                WordEntry updated = wordService.updateWord(entry, oldEntry.getWord());
                return ResponseEntity.ok(HttpStatus.OK);  // Success: Word updated
            }
            catch (ResponseStatusException ex) {
                throw ex;  // Pass along the exception to be handled by global exception handler
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Word not found");
        }
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }




}
