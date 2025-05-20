import React from 'react';
import WordFormComponent from './WordFormComponent';
import {Alert} from 'react-bootstrap';

/**
 * WordEditForm component for editing an existing word
 *
 * @param {Object} props - Component props
 * @param {Object} props.wordEntry - The word object to edit
 * @param {Function} props.updateWord - Function to update the word
 * @param {Function} props.cancelEditing - Function to cancel editing
 * @param {boolean} props.isLoading - Whether the update operation is in progress
 * @param {boolean} props.isError - Whether there was an error during the update operation
 * @returns {JSX.Element} Rendered component
 */
function WordEditForm({ wordEntry, updateWord, cancelEditing, isLoading = false, isError = false }) {
    const handleSubmit = (formData) => {
        // Preserve the ID when updating
        updateWord({
            ...formData,
            id: wordEntry.id
        });
    };

    return (
        <div className="edit-word-form p-3 border rounded mb-2">
            <h2>Edit Word</h2>

            {/*{isError && (*/}
            {/*    <Alert variant="danger" className="mb-3">*/}
            {/*        Failed to update word. Please try again.*/}
            {/*    </Alert>*/}
            {/*)}*/}

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