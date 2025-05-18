import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        remainingAttempts: 6,
        gameStatus: 'playing' // 'playing', 'won', 'lost'
    });

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
        const newRemainingAttempts = letterInWord
            ? gameState.remainingAttempts
            : gameState.remainingAttempts - 1;

        // Check if game is won (no more hidden letters)
        const isWon = !newHiddenWord.includes('_');

        // Check if game is lost (no more attempts)
        const isLost = newRemainingAttempts === 0;

        // Update game status
        let newGameStatus = 'playing';
        if (isWon) newGameStatus = 'won';
        if (isLost) newGameStatus = 'lost';

        // Update game state
        setGameState({
            ...gameState,
            hiddenWord: newHiddenWord,
            guessedLetters: newGuessedLetters,
            remainingAttempts: newRemainingAttempts,
            gameStatus: newGameStatus
        });
    };

    // Render keyboard for letter selection
    const renderKeyboard = () => {
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
    };

    // Render hangman figure based on remaining attempts
    const renderHangman = () => {
        const attemptsUsed = 6 - gameState.remainingAttempts;

        return (
            <div className="position-relative mx-auto mb-5" style={{ width: '250px', height: '250px' }}>
                {/* Base */}
                <div className="position-absolute bg-dark" style={{ bottom: '0', left: '50px', width: '150px', height: '4px' }}></div>

                {/* Pole */}
                <div className="position-absolute bg-dark" style={{ bottom: '0', left: '50px', width: '4px', height: '200px' }}></div>

                {/* Top */}
                <div className="position-absolute bg-dark" style={{ top: '50px', left: '50px', width: '100px', height: '4px' }}></div>

                {/* Rope */}
                <div className="position-absolute bg-dark" style={{ top: '50px', left: '150px', width: '4px', height: '30px' }}></div>

                {/* Head */}
                {attemptsUsed >= 1 && (
                    <div className="position-absolute rounded-circle border border-dark border-3"
                         style={{ top: '80px', left: '135px', width: '40px', height: '40px' }}></div>
                )}

                {/* Body */}
                {attemptsUsed >= 2 && (
                    <div className="position-absolute bg-dark"
                         style={{ top: '120px', left: '152px', width: '4px', height: '60px' }}></div>
                )}

                {/* Left arm */}
                {attemptsUsed >= 3 && (
                    <div className="position-absolute bg-dark"
                         style={{ top: '140px', left: '120px', width: '35px', height: '4px', transform: 'rotate(-45deg)' }}></div>
                )}

                {/* Right arm */}
                {attemptsUsed >= 4 && (
                    <div className="position-absolute bg-dark"
                         style={{ top: '140px', left: '152px', width: '35px', height: '4px', transform: 'rotate(45deg)' }}></div>
                )}

                {/* Left leg */}
                {attemptsUsed >= 5 && (
                    <div className="position-absolute bg-dark"
                         style={{ top: '180px', left: '120px', width: '35px', height: '4px', transform: 'rotate(45deg)' }}></div>
                )}

                {/* Right leg */}
                {attemptsUsed >= 6 && (
                    <div className="position-absolute bg-dark"
                         style={{ top: '180px', left: '152px', width: '35px', height: '4px', transform: 'rotate(-45deg)' }}></div>
                )}
            </div>
        );
    };

    // Game status display
    const renderGameStatus = () => {
        switch (gameState.gameStatus) {
            case 'won':
                return (
                    <div className="text-center mb-4">
                        <div className="alert alert-success p-4">
                            <h3 className="fs-2 fw-bold mb-3">Congratulations, {nickname}!</h3>
                            <p className="fs-4 mb-3">The word was: <span className="fw-bold">{gameState.word}</span></p>
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-primary btn-lg mt-2 px-4"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                );
            case 'lost':
                return (
                    <div className="text-center mb-4">
                        <div className="alert alert-danger p-4">
                            <h3 className="fs-2 fw-bold mb-3">Game Over!</h3>
                            <p className="fs-4 mb-3">The word was: <span className="fw-bold">{gameState.word}</span></p>
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-primary btn-lg mt-2 px-4"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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

                {/* Game container */}
                <div className="card bg-light border-0 shadow rounded-3 p-4">
                    {/* Display game status for special states */}
                    {gameState.gameStatus !== 'playing' && renderGameStatus()}

                    {/* Only show game elements when in playing state or game ended */}
                    {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') && (
                        <>
                            {/* Hangman figure */}
                            {renderHangman()}

                            {/* Word display */}
                            <div className="mb-5 text-center">
                                <div className="alert alert-info fs-5 d-inline-block px-4 py-2 mb-4">
                                    Attempts remaining: <span className="fw-bold">{gameState.remainingAttempts}</span>
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
                            {hint && (
                                <div className="text-center mb-4">
                                    <button
                                        className="btn btn-outline-info"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#hintCollapse"
                                        aria-expanded="false"
                                        aria-controls="hintCollapse"
                                    >
                                        Show Hint
                                    </button>
                                    <div className="collapse mt-2" id="hintCollapse">
                                        <div className="card card-body bg-light">
                                            <p className="mb-0"><strong>Hint:</strong> {hint}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Letter keyboard */}
                            {renderKeyboard()}
                        </>
                    )}
                </div>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-outline-secondary mt-2"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GamePage;
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
//
// function GamePage() {
//     const location = useLocation();
//     const navigate = useNavigate();
//
//     const { wordEntry, nickname } = location.state || {};
//     const{word,category,hint} = {...wordEntry};
//
//     // Redirect if no word data is available
//     useEffect(() => {
//         if (!word || !nickname) {
//             navigate('/');
//         }
//     }, [word, nickname, navigate]);
//
//     const [gameState, setGameState] = useState({
//         word: word?.toLowerCase() || '',
//         hiddenWord: word ? Array(word.length).fill('_') : [],
//         guessedLetters: [],
//         remainingAttempts: 6,
//         gameStatus: 'playing' // 'playing', 'won', 'lost'
//     });
//
//     // Handle letter guess
//     const handleGuess = (letter) => {
//         // If game is not in playing state, or letter already guessed, do nothing
//         if (gameState.gameStatus !== 'playing' || gameState.guessedLetters.includes(letter)) {
//             return;
//         }
//
//         // Add letter to guessed letters
//         const newGuessedLetters = [...gameState.guessedLetters, letter];
//
//         // Check if the letter is in the word
//         const letterInWord = gameState.word.includes(letter);
//
//         // Update hidden word with correctly guessed letters
//         const newHiddenWord = gameState.word.split('').map((char, index) => {
//             if (newGuessedLetters.includes(char) || char === ' ') {
//                 return char;
//             }
//             return gameState.hiddenWord[index];
//         });
//
//         // Update remaining attempts if guess was wrong
//         const newRemainingAttempts = letterInWord
//             ? gameState.remainingAttempts
//             : gameState.remainingAttempts - 1;
//
//         // Check if game is won (no more hidden letters)
//         const isWon = !newHiddenWord.includes('_');
//
//         // Check if game is lost (no more attempts)
//         const isLost = newRemainingAttempts === 0;
//
//         // Update game status
//         let newGameStatus = 'playing';
//         if (isWon) newGameStatus = 'won';
//         if (isLost) newGameStatus = 'lost';
//
//         // Update game state
//         setGameState({
//             ...gameState,
//             hiddenWord: newHiddenWord,
//             guessedLetters: newGuessedLetters,
//             remainingAttempts: newRemainingAttempts,
//             gameStatus: newGameStatus
//         });
//     };
//
//     // Render keyboard for letter selection
//     const renderKeyboard = () => {
//         const alphabet = 'abcdefghijklmnopqrstuvwxyz';
//
//         return (
//             <div className="flex flex-wrap justify-center gap-2">
//                 {alphabet.split('').map(letter => (
//                     <button
//                         key={letter}
//                         onClick={() => handleGuess(letter)}
//                         disabled={
//                             gameState.guessedLetters.includes(letter) ||
//                             gameState.gameStatus !== 'playing'
//                         }
//                         className={`w-10 h-10 flex items-center justify-center rounded-md text-lg font-medium ${
//                             gameState.guessedLetters.includes(letter)
//                                 ? gameState.word.includes(letter)
//                                     ? 'bg-green-500 text-white'
//                                     : 'bg-red-500 text-white'
//                                 : 'bg-gray-200 hover:bg-gray-300'
//                         }`}
//                     >
//                         {letter}
//                     </button>
//                 ))}
//             </div>
//         );
//     };
//
//     // Render hangman figure based on remaining attempts
//     const renderHangman = () => {
//         const attemptsUsed = 6 - gameState.remainingAttempts;
//
//         return (
//             <div className="w-64 h-64 mx-auto mb-6 border border-gray-300 relative">
//                 {/* Base */}
//                 <div className="absolute bottom-0 left-12 w-40 h-1 bg-black"></div>
//
//                 {/* Pole */}
//                 <div className="absolute bottom-0 left-12 w-1 h-48 bg-black"></div>
//
//                 {/* Top */}
//                 <div className="absolute top-16 left-12 w-24 h-1 bg-black"></div>
//
//                 {/* Rope */}
//                 <div className="absolute top-16 left-36 w-1 h-8 bg-black"></div>
//
//                 {/* Head */}
//                 {attemptsUsed >= 1 && (
//                     <div className="absolute top-24 left-32 w-10 h-10 rounded-full border-2 border-black"></div>
//                 )}
//
//                 {/* Body */}
//                 {attemptsUsed >= 2 && (
//                     <div className="absolute top-34 left-36 w-1 h-16 bg-black"></div>
//                 )}
//
//                 {/* Left arm */}
//                 {attemptsUsed >= 3 && (
//                     <div className="absolute top-38 left-26 w-10 h-1 bg-black transform rotate-45"></div>
//                 )}
//
//                 {/* Right arm */}
//                 {attemptsUsed >= 4 && (
//                     <div className="absolute top-38 left-36 w-10 h-1 bg-black transform -rotate-45"></div>
//                 )}
//
//                 {/* Left leg */}
//                 {attemptsUsed >= 5 && (
//                     <div className="absolute top-50 left-28 w-8 h-1 bg-black transform rotate-45"></div>
//                 )}
//
//                 {/* Right leg */}
//                 {attemptsUsed >= 6 && (
//                     <div className="absolute top-50 left-36 w-8 h-1 bg-black transform -rotate-45"></div>
//                 )}
//             </div>
//         );
//     };
//
//     // Game status display
//     const renderGameStatus = () => {
//         switch (gameState.gameStatus) {
//             case 'won':
//                 return (
//                     <div className="text-center">
//                         <p className="text-2xl text-green-600 font-bold mb-4">Congratulations, {nickname}! You won!</p>
//                         <p className="text-xl mb-6">The word was: <span className="font-semibold">{gameState.word}</span></p>
//                         <button
//                             onClick={() => navigate('/')}
//                             className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                         >
//                             Play Again
//                         </button>
//                     </div>
//                 );
//             case 'lost':
//                 return (
//                     <div className="text-center">
//                         <p className="text-2xl text-red-600 font-bold mb-4">Game Over!</p>
//                         <p className="text-xl mb-6">The word was: <span className="font-semibold">{gameState.word}</span></p>
//                         <button
//                             onClick={() => navigate('/')}
//                             className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };
//
//     // If no word data, show loading or redirect
//     if (!word || !nickname) {
//         return <div className="text-center p-8">Redirecting to home page...</div>;
//     }
//
//     return (
//         <div className="container mx-auto p-6">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-3xl font-bold">Hangman Game</h1>
//                 <div className="text-right">
//                     <p className="text-lg">Player: <span className="font-semibold">{nickname}</span></p>
//                     <p className="text-lg">Category: <span className="font-semibold">{category}</span></p>
//                 </div>
//             </div>
//
//             {/* Game container */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 {/* Display game status for special states */}
//                 {gameState.gameStatus !== 'playing' && renderGameStatus()}
//
//                 {/* Only show game elements when in playing state or game ended */}
//                 {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') && (
//                     <>
//                         {/* Hangman figure */}
//                         {renderHangman()}
//
//                         {/* Word display */}
//                         <div className="mb-8 text-center">
//                             <p className="text-xl mb-2">Attempts remaining: {gameState.remainingAttempts}</p>
//                             <div className="flex justify-center space-x-2">
//                                 {gameState.hiddenWord.map((char, index) => (
//                                     <span
//                                         key={index}
//                                         className="inline-block w-8 h-10 border-b-2 border-gray-700 text-center text-2xl font-bold"
//                                     >
//                                         {char !== '_' ? char : ''}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Letter keyboard */}
//                         {renderKeyboard()}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }
//
// export default GamePage;