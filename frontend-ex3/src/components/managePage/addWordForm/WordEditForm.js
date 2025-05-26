import React from 'react';
import WordFormComponent from './WordFormComponent';

/**
 * WordEditForm - Component for editing an existing word entry.
 *
 * @param {Object} props - Component props
 * @param {Object} props.wordEntry - The word object to be edited
 * @param {Function} props.updateWord - Function to call with updated word data
 * @param {Function} props.cancelEditing - Function to cancel the editing process
 * @param {boolean} [props.isLoading=false] - Flag to show loading state during update
 * @returns {JSX.Element} Rendered component
 */
function WordEditForm({ wordEntry, updateWord, cancelEditing, isLoading = false }) {

    /**
     * Handles the form submission and includes the original ID
     *
     * @param {Object} formData - Updated form data from user input
     */
    const handleSubmit = (formData) => {
        // Preserve the ID when updating
        updateWord({
            ...formData,
            id: wordEntry.id
        });
    };

    return (
        <div className="edit-word-form p-3 border rounded mb-2">
            <h4>Edit Entry</h4>
            <WordFormComponent
                initialFormState={wordEntry}
                onSubmit={handleSubmit}
                onCancel={cancelEditing}
                submitButtonText={isLoading ? "Saving..." : "Save"}
                disabled={isLoading}
            />
        </div>
    );
}

export default WordEditForm;