import React from "react";

/**
 * The About page component that describes the features and purpose of the game.
 * It includes a short explanation and credits the creators.
 *
 * @component
 * @returns {JSX.Element} The rendered About page.
 * @constructor
 */
function About() {
    return (
        <div className="container my-5">
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h1 className="card-title mb-4">About This Game</h1>

                    <p className="lead">
                        This single-page application is a fun and interactive word-guessing game,
                        combining elements from Hangman and Wordle. The player selects a word category,
                        guesses letters or the full word, and tries to get the highest score based on time,
                        number of attempts, and use of hints.
                    </p>

                    <h3 className="mt-4">Game Features</h3>
                    <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item">Select a category and start guessing a word</li>
                        <li className="list-group-item">Guess letters or the full word</li>
                        <li className="list-group-item">Track game time and number of attempts</li>
                        <li className="list-group-item">Receive hints and see the game status</li>
                        <li className="list-group-item">Submit your score to the leaderboard</li>
                        <li className="list-group-item">View and manage the word database (admin feature)</li>
                    </ul>

                    <h3 className="mt-5">Created by:</h3>
                    <p className="mb-0">Ophek Alon and Livnat Arama</p>
                </div>
            </div>
        </div>
    );
}

export default About;