import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDataApi from "../../customHooks/useDataApi";
import EndGame from "./EndGame";
import Keyboard from "./Keyboard";
import WordGuess from "./WordGuess";
import HomeButton from "./HomeButton";
import WordDisplay from "./WordDisplay";
import GameStatusBar from "./GameStatusBar";

/**
 * GamePage component is the main container for the Hangman game.
 * It manages the game logic, state updates, score submission, and UI rendering.
 *
 * @returns {JSX.Element} The game page JSX
 * @constructor
 */
function GamePage() {

    const location = useLocation();
    const navigate = useNavigate();

    const { wordEntry, nickname } = location.state || {};
    const { word, category, hint } = { ...wordEntry };

    /**
     * Redirects the user to home page if required data (word or nickname) is missing.
     * Runs once on component mount or when dependencies change.
     */
    useEffect(() => {
        if (!word || !nickname) {
            navigate('/');
        }
    }, [word, nickname, navigate]);

    const [gameState, setGameState] = useState({
        word: word?.toLowerCase() || '',
        hiddenWord: word ? Array(word.length).fill('_') : [],
        guessedLetters: [],
        attemptsCounter: 0,
        failedAttempts: 0,
        gameStatus: 'playing'    // 'playing', 'submitting-score', 'won', 'score-error'
    });

    const [hintState, setHintState] = useState( {
        pressed: false,
        showHint: false
    });

    // Add state to track current time from stopwatch
    const [currentTime, setCurrentTime] = useState(0);

    // API data fetching for score
    const [{ data, isLoading, isError}, fetchScore, reset] = useDataApi({ url: '' }, null);

    /**
     * Toggles the hint display when the hint button is pressed.
     * Updates hintState to show or hide the hint text.
     */
    const handleHintPressed = () => {
        setHintState( {
            ...hintState,
            pressed: true,
            showHint: !hintState.showHint
        });
    }

    /**
     * Updates the current time state with the stopwatch's latest time.
     * Uses setTimeout to defer update and avoid synchronous render issues.
     *
     * @param {number} time - The updated time in milliseconds
     */
    const handleTimeUpdate = (time) => {
        // Use setTimeout to defer the state update until after render
        setTimeout(() => {
            setCurrentTime(time);
        }, 0);
    };

    /**
     * Handles a letter guess by the player.
     * Updates guessed letters, hidden word, attempts and game status accordingly.
     *
     * @param {string} letter - The guessed letter
     */
    const handleGuess = (letter) => {
        // If game is not in playing state, or letter already guessed, do nothing
        if (gameState.gameStatus !== 'playing' || gameState.guessedLetters.includes(letter)) {
            return;
        }

        // Add letter to guessed letters
        const newGuessedLetters = [...gameState.guessedLetters, letter];

        // Check if the letter is in the word
        const letterInWord = gameState.word.includes(letter);

        // Update hidden word with correctly guessed letters
        const newHiddenWord = gameState.word.split('').map((char, index) => {
            if (newGuessedLetters.includes(char) || char === ' ') {
                return char;
            }
            return gameState.hiddenWord[index];
        });

        // Update remaining attempts if guess was wrong
        const newFailedAttempts = letterInWord
            ? gameState.failedAttempts
            : gameState.failedAttempts + 1;

        handleStateAfterGuess(newHiddenWord,newGuessedLetters,
            gameState.attemptsCounter + 1,newFailedAttempts);
    };

    /**
     * Handles a full word guess by the player.
     * If correct, reveals the entire word and submits score.
     * If wrong, updates guessed letters and failed attempts accordingly.
     *
     * @param {string} guessedWord - The guessed full word
     */
    const handleWordGuess = (guessedWord) => {
        // If game is not in playing state, do nothing
        if (gameState.gameStatus !== 'playing') {
            return;
        }

        // Check if the guessed word is exactly correct
        if (guessedWord === gameState.word) {
            // If correct, reveal the entire word and win the game
            setGameState({
                ...gameState,
                hiddenWord: gameState.word.split(''),
                attemptsCounter: gameState.attemptsCounter + 1,
                gameStatus: 'submitting-score'
            });
            // Submit score after state update
            submitScore();
            return;
        }

        // If word guess is wrong, extract all unique letters from the guessed word
        const lettersInGuess = [...new Set(guessedWord.split('').filter(char => char !== ' '))];

        // Add these letters to guessed letters (only new ones)
        const newGuessedLetters = [...new Set([...gameState.guessedLetters, ...lettersInGuess])];

        let newFailedAttempts = gameState.failedAttempts;

        // Update hidden word with any correctly guessed letters
        const newHiddenWord = gameState.word.split('').map((char, index) => {
            if (newGuessedLetters.includes(char) || char === ' ') {
                return char;
            }
            newFailedAttempts ++;
            return gameState.hiddenWord[index];
        });

        handleStateAfterGuess(newHiddenWord,newGuessedLetters,
            gameState.attemptsCounter + 1,newFailedAttempts);
    };

    /**
     * Updates the game state after a guess (letter or word).
     * Checks for winning condition and submits score if won.
     * Otherwise, updates guessed letters and attempts.
     *
     * @param {string[]} newHiddenWord - Updated hidden word array
     * @param {string[]} newGuessedLetters - Updated guessed letters array
     * @param {number} attemptsCounter - Updated attempts count
     * @param {number} failedAttempts - Updated failed attempts count
     */
    const handleStateAfterGuess = (newHiddenWord,newGuessedLetters,attemptsCounter,failedAttempts) => {

        // Check if game is won (no more hidden letters)
        const isWon = !newHiddenWord.includes('_');

        if (isWon) {
            // Set status to submitting-score first
            setGameState(prevState => ({
                ...prevState,
                hiddenWord: newHiddenWord,
                guessedLetters: newGuessedLetters,
                attemptsCounter: attemptsCounter,
                failedAttempts: failedAttempts,
                gameStatus: 'submitting-score'
            }));
            // Then submit score
            submitScore();
        }
        else{
            // Update game state normally for ongoing game
            setGameState(prevState => ({
                ...prevState,
                hiddenWord: newHiddenWord,
                guessedLetters: newGuessedLetters,
                attemptsCounter: attemptsCounter,
                failedAttempts: failedAttempts
            }));
        }
    };

    /**
     * Sends the player's score to the backend API.
     * Includes nickname, time taken, failed attempts, hint usage, and word length.
     */
    const submitScore = () => {
        fetchScore({
            url: '/api/scores',
            method: 'POST',
            data: {
                nickname: nickname,
                timeTakenMS: currentTime,
                attempts: gameState.failedAttempts,
                usedHint: hintState.pressed,
                wordLength: word.length
            }
        });
    };

    /**
     * Reacts to API submission results.
     * If successful, sets game status to 'won'.
     * If failed, sets game status to 'score-error'.
     */
    useEffect(() => {

        if (gameState.gameStatus === 'submitting-score') {
            if (!isLoading && !isError && data !== null) {
                // Score submitted successfully
                setGameState(prevState => ({
                    ...prevState,
                    gameStatus: 'won'
                }));
            } else if (!isLoading && isError) {
                // Score submission failed
                setGameState(prevState => ({
                    ...prevState,
                    gameStatus: 'score-error'
                }));
            }
        }
    }, [isLoading, isError, data, gameState.gameStatus]);

    /**
     * Handles retrying score submission in case of an error.
     * Resets API hook state and re-submits the score.
     */
    const handleRetryScore = () => {

        // Reset to clean state
        reset();

        setGameState(prevState => ({
            ...prevState,
            gameStatus: 'submitting-score'
        }));

        submitScore();
    };

    // If no word data, show loading or redirect
    if (!word || !nickname) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Redirecting to home page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="display-5 fw-bold">Hangman Game</h1>
                    <div className="text-start">
                        <p className="fs-5 mb-1">Player: <span className="fw-semibold">{nickname}</span></p>
                        <p className="fs-5 mb-0">Category: <span className="fw-semibold">{category}</span></p>
                    </div>
                </div>


                <div className="card bg-light border-0 shadow rounded-3 p-4">

                    {/* Error state for score submission */}
                    { (isError && gameState.gameStatus === 'score-error' && !isLoading) && (
                        <div className="alert alert-danger mb-4">
                            <p className="mb-2">Error submitting your score. Please try again.</p>
                            <button
                                className="btn btn-outline-danger"
                                onClick={handleRetryScore}
                                disabled={gameState.gameStatus === 'submitting-score' || isLoading}
                            >
                                Retry Score Submission
                            </button>
                            <HomeButton buttonText="Back To Home"/>
                        </div>
                    )}

                    {/* Game won successfully */}
                    { (gameState.gameStatus === 'won' && !isLoading && !isError) && (
                        <EndGame data={data} word = {word}/>
                    )}

                    {/* Game is still being played */}
                    {(gameState.gameStatus === 'playing' || (gameState.gameStatus === 'submitting-score' && !isError)) && (
                        <>
                            {/* Game Status Bar - Timer, Hint, and Attempts in one row using your components */}
                            <GameStatusBar
                                gameStatus={gameState.gameStatus}
                                onTimeUpdate={handleTimeUpdate}
                                attemptsCounter={gameState.attemptsCounter}
                                hint={hint}
                                hintState={hintState}
                                onHintPressed={handleHintPressed}
                            />

                            {/* Word display */}
                            <WordDisplay
                                hiddenWord={gameState.hiddenWord}
                            />

                            <Keyboard
                                gameState={gameState}
                                handleGuess={handleGuess}
                                isLoading={gameState.gameStatus === 'submitting-score' || isLoading}
                            />

                            <WordGuess
                                gameState={gameState}
                                handleWordGuess={handleWordGuess}
                                isLoading={gameState.gameStatus === 'submitting-score' || isLoading}
                            />

                            <HomeButton buttonText="Exit Game"/>

                            {/* Loading spinner overlay - only shows when submitting score */}
                            {gameState.gameStatus === 'submitting-score' && (
                                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-light bg-opacity-90 rounded-3"
                                     style={{ zIndex: 1000 }}>
                                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="text-muted fw-medium">Submitting your score...</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GamePage;