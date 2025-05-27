import React from 'react';

/**
 * WordRow component to display a single word with actions (edit, delete)
 *
 * @param {Object} props - Component props
 * @param {Object} props.wordEntry - The word object to display
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @param {Function} props.onDelete - Function to call when delete button is clicked
 * @param {boolean} props.disabled - Whether the row actions should be disabled
 * @returns {JSX.Element} Rendered component
 * @constructor
 */
function WordRow({ wordEntry, onEdit, onDelete, disabled = false}) {
    return (
        <tr>
            <td className="align-middle">
                <span className="fw-bold">{wordEntry.word}</span>
            </td>
            <td className="align-middle">
                <span className="badge bg-light text-dark">{wordEntry.category}</span>
            </td>
            <td className="align-middle">
                <span>{wordEntry.hint}</span>
            </td>
            <td className="text-end">
                <div className="btn-group">
                    <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={onEdit}
                        disabled={disabled}
                        title="Edit word"
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={onDelete}
                        disabled={disabled}
                        title="Delete word"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default WordRow;