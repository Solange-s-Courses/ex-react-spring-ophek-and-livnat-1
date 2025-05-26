## Authors:
### Livnat Arama - livnatar@edu.jmc.ac.il, Ophek Alon - ophekal@edu.jmc.ac.il

## Score Calculation System

### Overview
The game uses a comprehensive scoring system that rewards players based on multiple factors: word length, completion time, number of attempts, and hint usage.

### Score Components

#### 1. Base Score
- **Formula**: `wordLength × 100`
- **Purpose**: Ensures longer words provide higher base rewards
- **Example**: A 5-letter word gives 500 base points, while a 8-letter word gives 800 base points

#### 2. Time Bonus (Exponential Decay Model)
The time bonus uses an **exponential decay function** to reward fast completion while being forgiving to slower players.

##### How It Works
```
Time Bonus = Maximum Bonus × e^(-decay factor × time in seconds)
```

##### Key Parameters
- **Maximum Time Bonus**: 500 points (awarded for extremely fast completion)
- **Decay Factor**: 0.1 (controls how quickly the bonus decreases)
- **Time Conversion**: Milliseconds are converted to seconds for easier calculation

##### Why Exponential Decay?
1. **Steep Initial Reward**: Very fast players get substantially higher bonuses
2. **Gradual Decline**: The penalty becomes gentler as time increases
3. **Never Zero**: Even slow completions get some time bonus (though minimal)
4. **Natural Feel**: Mimics how human perception of "fast" vs "slow" works

##### Examples
- **5 seconds**: ~303 points (very fast)
- **10 seconds**: ~184 points (good)
- **20 seconds**: ~67 points (acceptable)
- **30 seconds**: ~25 points (slow but still rewarded)
- **60 seconds**: ~2 points (very slow)

#### 3. Attempts Penalty
- **Formula**: `attempts × 25`
- **Purpose**: Encourages players to think carefully before guessing
- **Impact**: Each wrong attempt costs 25 points

#### 4. Hint Penalty
- **Formula**: 100 points if hint is used, 0 if not
- **Purpose**: Rewards players who solve without assistance
- **Impact**: Using a hint costs exactly 100 points

### Final Score Calculation

```
Final Score = Base Score + Time Bonus - Attempts Penalty - Hint Penalty
Minimum Score = 0 (scores cannot be negative)
```

### Tuning the System

#### Adjusting Time Sensitivity
- **Lower Decay Factor** (e.g., 0.05): More forgiving to slower players
- **Higher Decay Factor** (e.g., 0.15): More emphasis on speed

#### Adjusting Maximum Bonus
- **Higher Maximum** (e.g., 700): Makes time more important relative to other factors
- **Lower Maximum** (e.g., 300): Reduces the impact of completion time

### Example Scenarios

#### Perfect Game (5-letter word)
- Base Score: 500
- Time Bonus: ~300 (completed in 5 seconds)
- Attempts Penalty: 25 (1 wrong attempt)
- Hint Penalty: 0
- **Final Score: 775**

#### Average Game (5-letter word)
- Base Score: 500
- Time Bonus: ~67 (completed in 20 seconds)
- Attempts Penalty: 75 (3 wrong attempts)
- Hint Penalty: 100 (used hint)
- **Final Score: 492**

#### Struggling Game (5-letter word)
- Base Score: 500
- Time Bonus: ~2 (completed in 60 seconds)
- Attempts Penalty: 150 (6 wrong attempts)
- Hint Penalty: 100 (used hint)
- **Final Score: 352**

### Benefits of This System

1. **Balanced**: No single factor dominates the scoring
2. **Encouraging**: Even slower players receive meaningful scores
3. **Skill-Rewarding**: Fast, accurate players get significantly higher scores
4. **Predictable**: Players can understand how their actions affect their score
5. **Scalable**: Works well for words of different lengths
