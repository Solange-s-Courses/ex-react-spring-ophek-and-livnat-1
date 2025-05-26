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
                                    <p className="mb-0">We'll randomly select a mystery word from your chosen category</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                     justify-content-center" style={{width: "35px", height: "35px"}}>2</span>
                                </div>
                                <div>
                                    <p className="mb-0">Guess letters to uncover the word before the hangman is complete</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                    justify-content-center" style={{width: "35px", height: "35px"}}>3</span>
                                </div>
                                <div>
                                    <p className="mb-0">Each wrong guess adds a body part to the hangman (6 mistakes allowed)</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 me-3">
                                    <span className="badge rounded-circle bg-secondary d-flex align-items-center
                                    justify-content-center" style={{width: "35px", height: "35px"}}>4</span>
                                </div>
                                <div>
                                    <p className="mb-0">Guess the word correctly to win and save the stick figure!</p>
                                </div>
                            </div>
                        </div>

                        <div className="alert alert-warning">
                            <div className="d-flex">
                                <div className="me-2">💡</div>
                                <div>
                                    <strong>Pro Tip:</strong> Start with common vowels like A, E, I, O, U to reveal more letters!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default GameRules;