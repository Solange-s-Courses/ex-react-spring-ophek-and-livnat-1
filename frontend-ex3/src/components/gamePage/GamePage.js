import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDataApi from "../../customHooks/useDataApi";
import EndGame from "./EndGame";
import Keyboard from "./Keyboard";
import WordGuess from "./WordGuess";
import GameStopwatch from "./GameStopwatch";
import HomeButton from "./HomeButton";

function GamePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { wordEntry, nickname } = location.state || {};
    const { word, category, hint } = { ...wordEntry };

    // Redirect if no word data is available
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
        gameStatus: 'playing' // 'playing' or 'won'
    });

    const [hintState, setHintState] = useState( {
        pressed: false,
        showHint: false
    });

    // Add state to track current time from stopwatch
    const [currentTime, setCurrentTime] = useState(0);

    // API data fetching for score
    const [{ data, isLoading, isError}, fetchScore] = useDataApi({ url: '' }, null);

    const handleHintPressed = () => {
        setHintState( {
            ...hintState,
            pressed: true,
            showHint: !hintState.showHint
        });
    }

    // Handle time update from stopwatch
    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    // Handle letter guess
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

    //Handle word guess
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
                gameStatus: 'won'
            });
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

    const handleStateAfterGuess = (newHiddenWord,newGuessedLetters,attemptsCounter,failedAttempts) => {

        // Check if game is won (no more hidden letters)
        const isWon = !newHiddenWord.includes('_');

        // Update game status
        let newGameStatus = 'playing';
        if (isWon) {
            newGameStatus = 'won';
            //handleFetchScore();
            fetchScore({url: '/api/sscores',
                method: 'POST',
                data: {
                    nickname: nickname,
                    timeTakenSeconds: currentTime,
                    attempts: gameState.failedAttempts,
                    usedHint: hintState.pressed,
                    wordLength: word.length
                }
            });
        }

        // Update game state
        setGameState({
            ...gameState,
            hiddenWord: newHiddenWord,
            guessedLetters: newGuessedLetters,
            attemptsCounter: attemptsCounter,
            failedAttempts: failedAttempts,
            gameStatus: newGameStatus
        });
    };

    const handleFetchScore = () => {
        fetchScore({
            url: '/api/sscores',
            method: 'POST',
            data: {
                nickname: nickname,
                timeTakenSeconds: currentTime,
                attempts: gameState.failedAttempts,
                usedHint: hintState.pressed,
                wordLength: word.length
            }
        });
    };

    // const handleExitGame = () => {
    //     navigate('/');
    // }

    // If no word data, show loading or redirect
    if (!word || !nickname) {
        return <div className="text-center p-5">Redirecting to home page...</div>;
    }

    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="display-5 fw-bold">Hangman Game</h1>
                    <div className="text-end">
                        <p className="fs-5 mb-1">Player: <span className="fw-semibold">{nickname}</span></p>
                        <p className="fs-5 mb-0">Category: <span className="fw-semibold">{category}</span></p>
                    </div>
                </div>


                <div className="card bg-light border-0 shadow rounded-3 p-4">

                    {/* Loading spinner overlay */}
                    {isLoading && (
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75" style={{ zIndex: 1000 }}>
                            <div className="text-center spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* Error state */}
                    { (isError && gameState.gameStatus === 'won' && !isLoading) && (
                        <div className="alert alert-danger mb-4">
                            <p className="mb-2">Error submitting your score. Please try again.</p>
                            <button
                                className="btn btn-outline-danger"
                                onClick={()=> {
                                    fetchScore({url: '/api/scores',
                                        method: 'POST',
                                        data: {
                                            nickname: nickname,
                                            timeTakenSeconds: currentTime,
                                            attempts: gameState.failedAttempts,
                                            usedHint: hintState.pressed,
                                            wordLength: word.length
                                        }
                                    });
                                }}
                                disabled={isLoading}
                            >
                                Retry
                            </button>

                            <HomeButton buttonText="Back To Home"/>
                        </div>
                    )}

                    {/* Display game status for special states */}
                    { (gameState.gameStatus === 'won' && !isLoading && !isError) && (
                    <EndGame
                        data={data}
                        word = {word}
                    />)}

                    {/* Only show game elements when in playing state or game ended */}
                    {(gameState.gameStatus === 'playing' && !isLoading) && (
                        <>
                            {/* The stopwatch */}
                            <GameStopwatch
                                gameStatus={gameState.gameStatus}
                                //onTimeUpdate={handleTimeUpdate}
                                onTimeUpdate={setCurrentTime}
                                //isLoading = {isLoading}
                            />

                            {/* Word display */}
                            <div className="mb-5 text-center">
                                <div className="alert alert-info fs-5 d-inline-block px-4 py-2 mb-4">
                                    Number of Attempts: <span className="fw-bold">{gameState.attemptsCounter}</span>
                                </div>
                                <div className="d-flex justify-content-center gap-2 mb-2">
                                    {gameState.hiddenWord.map((char, index) => (
                                        <div
                                            key={index}
                                            className="d-inline-block border-bottom border-2 border-dark text-center mx-1"
                                            style={{ width: '35px', height: '45px' }}
                                        >
                                            <span className="fs-3 fw-bold">{char !== '_' ? char : ''}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hint section - if hint exists */}
                            <div className="text-center mb-4">
                                <button
                                    className="btn btn-outline-info"
                                    type="button"
                                    onClick={handleHintPressed}
                                >
                                    {hintState.showHint ? 'Hide Hint' : 'Show Hint'}
                                </button>
                                { hintState.showHint && (
                                    <div className="mt-2 card card-body bg-light">
                                        <p className="mb-0"><strong>Hint:</strong> {hint}</p>
                                    </div>
                                )}
                            </div>

                            <WordGuess
                                gameState={gameState}
                                handleWordGuess={handleWordGuess}
                                isLoading={isLoading}
                            />

                            <Keyboard
                                gameState={gameState}
                                handleGuess={handleGuess}
                                isLoading={isLoading}
                            />

                            {/*<div className="mt-4 text-center">*/}
                            {/*    <button*/}
                            {/*        onClick={handleExitGame}*/}
                            {/*        className="btn btn-outline-secondary mt-2"*/}
                            {/*    >*/}
                            {/*        Exit Game*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            <HomeButton buttonText="Exit Game"/>
                        </>
                    )}
                </div>


            </div>
        </div>
    );
}

export default GamePage;
