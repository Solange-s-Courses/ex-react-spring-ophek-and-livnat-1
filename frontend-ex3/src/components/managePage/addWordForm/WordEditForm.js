import React from 'react';
import WordFormComponent from './WordFormComponent';

/**
 * WordEditForm component for editing an existing word
 *
 * @param {Object} props - Component props
 * @param {Object} props.wordEntry - The word object to edit
 * @param {Function} props.updateWord - Function to update the word
 * @param {Function} props.cancelEditing - Function to cancel editing
 * @returns {JSX.Element} Rendered component
 */
function WordEditForm({ wordEntry, updateWord, cancelEditing }) {
    const handleSubmit = (formData) => {
        // Preserve the ID when updating
        updateWord({
            ...formData,
            id: wordEntry.id
        });
    };

    return (
        <div className="edit-word-form">
            <h2>Edit Word</h2>
            <WordFormComponent
                initialFormState={wordEntry}
                onSubmit={handleSubmit}
                onCancel={cancelEditing}
                submitButtonText="Save"
            />
        </div>
    );
}

export default WordEditForm;