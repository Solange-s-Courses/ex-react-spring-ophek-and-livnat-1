import React from "react";

function Keyboard({gameState, handleGuess}){

    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return (
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {alphabet.split('').map(letter => (
                <button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={
                        gameState.guessedLetters.includes(letter) ||
                        gameState.gameStatus !== 'playing'
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
    );
}
export default Keyboard;