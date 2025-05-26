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
        <div className="card shadow-sm border-0 min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="card-body text-start">
                <h1 className="card-title mb-4">About This Game</h1>

                <p className="lead">
                    This single-page application is a fun and interactive word-guessing game,
                    inspired by a mix of Hangman and Wordle.
                    <br />
                    <strong>Before starting the game, you need to enter your nickname and choose a word category.</strong>
                    <br />
                    Once you're ready, the game begins! Try to guess the word by selecting letters or entering the full word,
                    and aim for the best score based on your time, number of attempts, and use of hints.
                </p>

                <h3 className="mt-4">Game Features</h3>
                <ul className="ps-3 lh-lg mb-4">
                    <li className="mb-2">Select a category and start guessing a word</li>
                    <li className="mb-2">Guess individual letters or the full word</li>
                    <li className="mb-2">Track your time and number of attempts</li>
                    <li className="mb-2">Use hints to reveal parts of the word</li>
                    <li className="mb-2">Submit your score to the leaderboard</li>
                    <li className="mb-2">View and manage the word database</li>
                </ul>

                <h3 className="mt-5">Created by:</h3>
                <p className="mb-0">Ophek Alon and Livnat Arama</p>
            </div>
        </div>
    );
}

export default About;



// import React from "react";
//
// /**
//  * The About page component that describes the features and purpose of the game.
//  * It includes a short explanation and credits the creators.
//  *
//  * @component
//  * @returns {JSX.Element} The rendered About page.
//  * @constructor
//  */
// function About() {
//     return (
//
//             <div className="card shadow-sm border-0 min-vh-100 py-5 bg-info bg-opacity-25">
//                 <div className="card-body">
//                     <h1 className="card-title mb-4">About This Game</h1>
//
//                     <p className="lead">
//                         This single-page application is a fun and interactive word-guessing game,
//                         combining elements from Hangman and Wordle. The player selects a word category,
//                         guesses letters or the full word, and tries to get the highest score based on time,
//                         number of attempts, and use of hints.
//                     </p>
//
//                     <h3 className="mt-4">Game Features</h3>
//                     <ul className="list-group list-group-flush mb-4">
//                         <li className="list-group-item">Select a category and start guessing a word</li>
//                         <li className="list-group-item">Guess letters or the full word</li>
//                         <li className="list-group-item">Track game time and number of attempts</li>
//                         <li className="list-group-item">Receive hints and see the game status</li>
//                         <li className="list-group-item">Submit your score to the leaderboard</li>
//                         <li className="list-group-item">View and manage the word database</li>
//                     </ul>
//
//                     <h3 className="mt-5">Created by:</h3>
//                     <p className="mb-0">Ophek Alon and Livnat Arama</p>
//                 </div>
//             </div>
//     );
// }
//
// export default About;