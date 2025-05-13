package com.example.backendex3.controllers;
import com.example.backendex3.dto.ScoreDTO;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.server.ResponseStatusException;
import com.example.backendex3.repositories.Score;
import com.example.backendex3.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backendex3.utils.ValidationUtil;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for score management and leaderboard functionality.
 * Provides endpoints for submitting new scores and retrieving leaderboard data.
 */
@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * Submits a new score for a player based on game statistics.
     * Calculates the final score and adds it to the leaderboard.
     *
     * @param scoreDTO Data Transfer Object containing game statistics
     * @return ResponseEntity with the submission result
     */
    @PostMapping(value ="")
    public ResponseEntity<Score> submitScore(@Valid @RequestBody ScoreDTO scoreDTO) throws IOException {
        // Calculate score based on game statistics
        int calculatedScore = scoreService.calculateScore(
                scoreDTO.getTimeTakenSeconds(),
                scoreDTO.getAttempts(),
                scoreDTO.isUsedHint(),
                scoreDTO.getWordLength()
        );

        // Save the score to the leaderboard
        boolean saved = scoreService.savePlayerScore(scoreDTO.getNickname(), calculatedScore);
        if (!saved) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Failed to save score. Player may already exist with a higher score.");
        }

        return ResponseEntity.ok(new Score(scoreDTO.getNickname(), calculatedScore));
    }



    /**
     * Retrieves the default top 20 scores from the leaderboard.
     *
     * @return ResponseEntity with the list of top 20 scores
     */
    @GetMapping(value = "")
    public ResponseEntity<List<Score>> getTopScores() throws IOException{

        List<Score> topScores = scoreService.getTopScores(20); // Default is 20
        return ResponseEntity.ok(topScores);
    }


//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex)
//    {
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
//    }
//
//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
//        return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleAllExceptions(Exception e) {
//        return ResponseEntity.internalServerError().body("Internal server error: " + e.getMessage());
//    }

}