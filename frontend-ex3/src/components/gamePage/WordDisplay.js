import React from 'react';

/**
 * WordDisplay component visually displays the current state of the hidden word.
 * Each character is shown in a styled box. Underscores ('_') are displayed as empty spaces.
 *
 * @param {Object} props
 * @param {string[]} props.hiddenWord - An array of characters representing the current state of the word,
 *                                      with unGuessed letters typically represented by underscores ('_').
 * @returns {JSX.Element} Word display UI.
 * @constructor
 */
function WordDisplay({ hiddenWord }) {
    return (
        <div className="text-center mb-4">
                <div className="card-body py-3">
                    <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
                        {hiddenWord.map((char, index) => (
                            <div
                                key={index}
                                className="word-letter d-flex align-items-center justify-content-center border-bottom border-3"
                                style={{
                                    width: '50px',
                                    height: '60px',
                                    borderRadius: '8px 8px 0 0'
                                }}
                            >
                                <span className="fs-2 fw-bold text-dark">
                                    {char !== '_' ? char.toUpperCase() : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}

export default WordDisplay;
