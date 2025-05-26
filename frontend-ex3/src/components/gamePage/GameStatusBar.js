import GameStopwatch from "./GameStopwatch";
import HintSection from "./HintSection";

function GameStatusBar ( {gameStatus, onTimeUpdate, attemptsCounter, hint, hintState, onHintPressed }) {
    return (
        <div className="mb-3">
            <div className="card-body p-0">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {/* Stopwatch */}
                        <div className="p-3 mb-3 bg-light bg-opacity-25">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-stopwatch text-primary me-2 fs-5"></i>
                                <span className="fw-medium text-dark">
                                        <GameStopwatch
                                            gameStatus={gameStatus}
                                            onTimeUpdate={onTimeUpdate}
                                        />
                                    </span>
                            </div>
                        </div>

                        {/* Attempts Counter - match design */}
                        <div className="p-3 mb-3 bg-light bg-opacity-25">
                            <div className="d-flex align-items-center">
                                <i className="bi bi-target text-success me-2 fs-5"></i>
                                <span className="fw-medium text-dark">
                                        Attempts: {attemptsCounter}
                                    </span>
                            </div>
                        </div>

                        {/* Hint section */}
                        <HintSection hint={hint} hintState={hintState} onHintPressed={onHintPressed} />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameStatusBar;