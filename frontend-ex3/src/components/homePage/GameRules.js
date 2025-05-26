import React from "react";

function GameRules () {

    return (
        <div className="col-md-6">
            <div className="card h-100 bg-light border-0 shadow rounded-3">
                <div className="card-body p-4">
                    <h2 className="card-title fs-2 mb-4 text-center">
                        <span className="badge rounded-pill bg-danger p-2 me-2">?</span>
                        How To Play
                    </h2>

                    <div className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                    justify-content-center" style={{width: "35px", height: "35px"}}>1</span>
                            </div>
                            <div>
                                <p className="mb-0">Enter your nickname and select a word category</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                     justify-content-center" style={{width: "35px", height: "35px"}}>2</span>
                            </div>
                            <div>
                                <p className="mb-0">Guess by clicking letters or typing the full word</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                    justify-content-center" style={{width: "35px", height: "35px"}}>3</span>
                            </div>
                            <div>
                                <p className="mb-0">Need help? Use hints to reveal word clues</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                    justify-content-center" style={{width: "35px", height: "35px"}}>4</span>
                            </div>
                            <div>
                                <p className="mb-0">Your score depends on speed, attempts, and hint usage</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                    justify-content-center" style={{width: "35px", height: "35px"}}>5</span>
                            </div>
                            <div>
                                <p className="mb-0">Solve the word to submit your score to the leaderboard</p>
                            </div>
                        </div>
                    </div>

                    <div className="alert alert-info mb-3">
                        <div className="d-flex">
                            <div className="me-2">🎯</div>
                            <div>
                                <strong>High Scores:</strong> Less time, fewer guesses, no hints = top scores!
                            </div>
                        </div>
                    </div>

                    <div className="alert alert-warning">
                        <div className="d-flex">
                            <div className="me-2">💡</div>
                            <div>
                                <strong>Smart Start:</strong> Try vowels first - A, E, I, O, U reveal patterns!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default GameRules;