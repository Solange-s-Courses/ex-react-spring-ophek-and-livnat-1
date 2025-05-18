import React from 'react';

/**
 * WordRow component to display a single word with actions
 *
 * @param {Object} props - Component props
 * @param {Object} props.wordEntry - The word object to display
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 * @returns {JSX.Element} Rendered component
 * @constructor
 */
function WordRow({ wordEntry, onEdit, onDelete }) {
    return (
        <div className="list-group-item p-3 border-start-0 border-end-0 border-top-0 border-bottom">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center">
                            <h5 className="mb-1 fw-bold">{wordEntry.word}, {wordEntry.category}</h5>
                            <div className="text-muted small d-flex align-items-center">
                                <i className="bi bi-geo-alt me-1"></i>
                                <span>Hint: {wordEntry.hint}</span>
                            </div>

                    </div>
                </div>

                <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <div className="d-flex justify-content-md-end">
                        <button
                            className="btn btn-outline-secondary me-2 d-flex align-items-center"
                            onClick={onEdit}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                            className="btn btn-outline-danger d-flex align-items-center"
                            onClick={onDelete}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordRow;