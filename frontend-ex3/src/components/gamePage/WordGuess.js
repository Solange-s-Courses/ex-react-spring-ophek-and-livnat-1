import React, { useState } from "react";

/**
 * WordGuess component allows the player to input and submit a full-word guess
 * during the game. It handles validation and formatting of the input before
 * invoking the handler passed from the parent component.
 *
 * @component
 * @param {Object} props
 * @param {{ gameStatus: string }} props.gameState - The current state of the game, including status ('playing', 'won', 'lost', etc.).
 * @param {function} props.handleWordGuess - Callback function to handle a full-word guess submission.
 * @param {boolean} [props.isLoading=false] - Optional flag to indicate if the game is currently processing a guess.
 * @returns {JSX.Element} Word guess form UI.
 * @constructor
 */
function WordGuess({ gameState, handleWordGuess, isLoading = false }) {

    const [wordInput, setWordInput] = useState('');

    /**
     * Handles form submission for guessing a word.
     * Prevents empty or invalid inputs and normalizes the input word.
     *
     * @param e - The form submission event.
     */
    const handleWordSubmit = (e) => {
        e.preventDefault();
        if (wordInput.trim().length > 0) {
            handleWordGuess(wordInput.trim().toLowerCase());
            setWordInput(''); // Clear input after submission
        }
    };

    /**
     * Handles changes to the word input field.
     * Filters out non-letter characters and updates the state.
     *
     * @param e - The input change event.
     */
    const handleInputChange = (e) => {
        // Only allow letters and spaces
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setWordInput(value);
    };

    return (
        <div className="mb-4">
            <div className="card-body">
                <form onSubmit={handleWordSubmit}>
                    <div className="text-center mb-3">
                        <small className="text-muted">Or guess the entire word</small>
                    </div>

                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <input
                            id="wordInput"
                            type="text"
                            value={wordInput}
                            onChange={handleInputChange}
                            disabled={gameState.gameStatus !== 'playing' || isLoading}
                            placeholder="Enter your guess"
                            className="form-control border-2"
                            style={{ maxWidth: "300px" }}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={
                                gameState.gameStatus !== 'playing' ||
                                wordInput.trim().length === 0 ||
                                isLoading
                            }
                            className="btn btn-success px-4 fw-medium">
                            Guess
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WordGuess;