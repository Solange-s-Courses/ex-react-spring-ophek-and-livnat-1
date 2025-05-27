import React from 'react';
import { useWordManagement } from '../WordManagementContext';

/**
 * AddWordButton component that displays a prominent button to initiate adding a new word.
 *
 * @returns {JSX.Element} A styled button that opens the add word form when clicked
 */
function AddWordButton() {

    const { setShowForm } = useWordManagement();

    /**
     * Handles the button click by showing the add word form.
     */
    const handleClick = () => {
        setShowForm(true);
    };

    return (
        <div className="mb-5 pt-3 d-grid d-md-flex justify-content-center">
            <button
                className="btn btn-primary py-2 px-4 rounded-3 shadow-sm"
                onClick={handleClick}
            >
                <div className="d-flex align-items-center justify-content-center">
                    <i className="bi bi-plus-circle me-2"></i>
                    <span>Add New Word Entry</span>
                </div>
            </button>
        </div>
    );
}

export default AddWordButton;