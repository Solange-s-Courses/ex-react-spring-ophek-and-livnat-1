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
