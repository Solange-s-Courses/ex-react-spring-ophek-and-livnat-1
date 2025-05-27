import React from "react";

/**
 * HintSection component displays a button to toggle the visibility of a hint message.
 * When the hint is shown, the button changes style and the hint text is displayed below.
 *
 * @param {Object} props
 * @param {string} props.hint - The hint text to display when visible.
 * @param {Object} props.hintState - State object controlling hint visibility.
 * @param {Function} props.onHintPressed - Callback function invoked when the button is clicked to toggle the hint.
 * @returns {JSX.Element} The hint toggle button and the hint message if visible.
 * @constructor
 */
function HintSection({ hint, hintState, onHintPressed }) {
    return (
        <div className="mt-2">
            {/* Button */}
            <div className="text-start">
                <button
                    className={`btn ${hintState.showHint ? 'btn-warning' : 'btn-outline-warning'} px-4 py-2 fw-medium`}
                    type="button"
                    onClick={onHintPressed}
                >
                    <i className={`bi ${hintState.showHint ? 'bi-lightbulb-fill' : 'bi-lightbulb'} me-2`}></i>
                    {hintState.showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
            </div>

            {/* Full-width hint below the button */}
            {hintState.showHint && (
                <div className="mt-3 alert alert-warning border-0 bg-warning bg-opacity-10 w-100">
                    <p className="mb-0 text-warning-emphasis">
                        <i className="bi bi-info-circle-fill text-warning me-2"></i>
                        {hint}
                    </p>
                </div>
            )}
        </div>
    );
}
export default HintSection