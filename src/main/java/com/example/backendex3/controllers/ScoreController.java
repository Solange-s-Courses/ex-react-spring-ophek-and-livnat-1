package com.example.backendex3.controllers;
import com.example.backendex3.dto.ScoreDTO;
import com.example.backendex3.repositories.Score;
import com.example.backendex3.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for managing player scores and leaderboard data.
 * This controller handles score submissions and leaderboard retrievals.
 */
@RestController
@RequestMapping("/api/scores")
public class ScoreController {

    private final ScoreService scoreService;

    /**
     * Constructs a ScoreController with dependency injection for ScoreService.
     *
     * @param scoreService Service layer responsible for business logic related to scores
     */
    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    /**
     * Submits a new score for a player based on game statistics.
     * The score is calculated on the server side and added to the leaderboard.
     *
     * @param scoreDTO Data Transfer Object containing player's game stats (nickname, time taken, attempts, hint usage, etc.)
     * @return ResponseEntity containing:
     *         - score: the calculated score
     *         - nickname: the player nickname
     *         - rank: the player's current rank
     *         - status: true if the score was added or improved,false otherwise
     * @throws IOException if reading/writing data fails
     */
    @PostMapping(value ="")
    public ResponseEntity<Map<String, Object>> submitScore(@Valid @RequestBody ScoreDTO scoreDTO) throws IOException {

        int calculatedScore = scoreService.calculateScore(
                scoreDTO.getTimeTakenMS(),
                scoreDTO.getAttempts(),
                scoreDTO.isUsedHint(),
                scoreDTO.getWordLength()
        );

        boolean changed = scoreService.savePlayerScore(scoreDTO.getNickname(), calculatedScore);

        // creating object that'll be passed to frontend
        Map<String, Object> response = new HashMap<>();
        response.put("score", calculatedScore);
        response.put("nickname", scoreDTO.getNickname());
        response.put("rank", scoreService.getPlayersRank(scoreDTO.getNickname()));
        response.put("status", changed); // true if score improved or added

        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves the full leaderboard of top scores.
     *
     * @return ResponseEntity with a list of {@link Score} objects representing the leaderboard
     * @throws IOException if leaderboard data cannot be accessed
     */
    @GetMapping(value = "")
    public ResponseEntity<List<Score>> getScores() throws IOException{

        List<Score> topScores = scoreService.getLeaderboard();
        return ResponseEntity.ok(topScores);
    }
}