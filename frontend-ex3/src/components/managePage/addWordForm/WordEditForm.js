import React from 'react';
import WordFormComponent from './WordFormComponent';
import { useWordManagement } from '../../WordManagementContext';

/**
 * WordEditForm component for editing an existing word entry.
 *
 * @param {Object} props - Component props
 * @param {Object} props.wordEntry - The word object being edited
 * @param {Function} props.updateWord - Function to call with updated word data
 * @param {Function} props.cancelEditing - Function to cancel editing and close form
 * @returns {JSX.Element} Rendered edit form with title and form component
 */
function WordEditForm({ wordEntry, updateWord, cancelEditing }) {

    const { isUpdating } = useWordManagement();

    /**
     * Handles form submission by preserving the original word ID and calling updateWord.
     * The ID must be preserved to ensure the backend knows which word to update.
     * The updateWord function is provided by the parent WordsList component.
     *
     * @param {Object} formData - The updated form data from WordFormComponent
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
                submitButtonText={isUpdating ? "Saving..." : "Save"}
                disabled={isUpdating}
            />
        </div>
    );
}

export default WordEditForm;