import { useState } from "react";

function WordGuess({ gameState, handleWordGuess, isLoading = false }) {

    const [wordInput, setWordInput] = useState('');

    const handleWordSubmit = (e) => {
        e.preventDefault();
        if (wordInput.trim().length > 0) {
            handleWordGuess(wordInput.trim().toLowerCase());
            setWordInput(''); // Clear input after submission
        }
    };

    const handleInputChange = (e) => {
        // Only allow letters and spaces
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setWordInput(value);
    };

    return (
        <div>
            {/* Word guess input section */}
            <div className="mb-4">
                <form onSubmit={handleWordSubmit} className="text-center">
                    <div className="mb-3">
                        <label htmlFor="wordInput" className="form-label fw-semibold">
                            Guess the entire word:
                        </label>
                        <div className="d-flex justify-content-center gap-2">
                            <input
                                id="wordInput"
                                type="text"
                                value={wordInput}
                                onChange={handleInputChange}
                                disabled={gameState.gameStatus !== 'playing' || isLoading}
                                placeholder="Enter your word guess..."
                                className="form-control"
                                style={{ maxWidth: '300px' }}
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={
                                    gameState.gameStatus !== 'playing' ||
                                    wordInput.trim().length === 0 ||
                                    isLoading
                                }
                                className="btn btn-primary"
                            >
                                Guess Word
                            </button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default WordGuess;