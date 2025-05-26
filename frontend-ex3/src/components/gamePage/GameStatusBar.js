import GameStopwatch from "./GameStopwatch";
import HintSection from "./HintSection";

/**
 * GameStatusBar displays the game timer, attempts counter, and hint section.
 *
 * @param {Object} props
 * @param {string} props.gameStatus - The current status of the game (e.g., 'playing', 'won').
 * @param {(time: number) => void} props.onTimeUpdate - Callback triggered on timer updates with elapsed time in milliseconds.
 * @param {number} props.attemptsCounter - Number of attempts the player has made.
 * @param {string} props.hint - The hint text to be displayed when enabled.
 * @param {Object} props.hintState - State object controlling hint visibility (e.g., { showHint: boolean }).
 * @param {() => void} props.onHintPressed - Callback fired when the hint button is pressed.
 * @returns {JSX.Element} The status bar UI component.
 * @constructor
 */
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