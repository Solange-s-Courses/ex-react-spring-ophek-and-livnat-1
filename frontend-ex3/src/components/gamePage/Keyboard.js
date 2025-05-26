import React from "react";

/**
 * Keyboard component renders an interactive on-screen keyboard for guessing letters.
 * Displays alphabet letters as buttons, with visual feedback for guessed letters.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.gameState - Current game state containing guessed letters, word, and status.
 * @param {function} props.handleGuess - Callback function called when a letter button is clicked. Receives the guessed letter as argument.
 * @param {boolean} [props.isLoading=false] - Whether the game is currently loading; disables input if true.
 * @returns {JSX.Element} The interactive keyboard UI.
 * @constructor
 */
function Keyboard({gameState, handleGuess, isLoading = false}){

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return (
        <>
            <div className="text-center mb-4">
                <hr className="my-3" />
                <small className="text-muted">Guess letter by letter:</small>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                {alphabet.split('').map(letter => (
                    <button
                        key={letter}
                        onClick={() => handleGuess(letter)}
                        disabled={
                            gameState.guessedLetters.includes(letter) ||
                            gameState.gameStatus !== 'playing' ||
                            isLoading
                        }
                        className={`btn rounded-3 fw-medium px-3 py-2 m-1 ${
                            gameState.guessedLetters.includes(letter)
                                ? gameState.word.includes(letter)
                                    ? 'btn-success'
                                    : 'btn-danger'
                                : 'btn-outline-secondary'
                        }`}
                    >
                        {letter.toUpperCase()}
                    </button>
                ))}
            </div>
        </>
    );
}
export default Keyboard;