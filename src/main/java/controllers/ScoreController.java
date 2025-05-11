package controllers;
import dto.*;
import org.springframework.web.ErrorResponse;
import org.springframework.web.server.ResponseStatusException;
import repositories.Score;
import services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utils.ValidationUtil;

import java.io.IOException;
import java.util.List;

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
    @PostMapping("")
    public ResponseEntity<Score> submitScore(@RequestBody ScoreDTO scoreDTO) throws IOException, IllegalArgumentException {

        // Validate all required fields
        ValidationUtil.checkNotEmpty(scoreDTO.getNickname());
        ValidationUtil.checkIsValidTime(scoreDTO.getTimeTakenSeconds());
        ValidationUtil.checkIsValidAttempts(scoreDTO.getAttempts());
        ValidationUtil.checkIsValidWordLength(scoreDTO.getWordLength());

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


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("Invalid input: " + e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleAllExceptions(Exception e) {
        return ResponseEntity.internalServerError().body("Internal server error: " + e.getMessage());
    }

}