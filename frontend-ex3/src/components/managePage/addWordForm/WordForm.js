import React from 'react';
import WordFormComponent from './WordFormComponent';
import { useWordManagement } from '../../WordManagementContext';

/**
 * WordForm component for adding a new word to the system.
 *
 * @returns {JSX.Element} Rendered add word form with title and form component
 */
function WordForm() {

    const { addWord, setShowForm, isAdding, cancelWithRefresh } = useWordManagement();

    const initialFormState = {
        word: '',
        category: '',
        hint: ''
    };

    /**
     * Handles form submission by delegating to the Context's addWord function.
     *
     * @param {Object} formData - The form data collected from WordFormComponent
     */
    const handleSubmit = (formData) => {
        addWord(formData);
    };

    /**
     * Handles cancellation of the form and refreshes data.
     * Refreshes to ensure we have latest data in case of external changes.
     */
    const handleCancel = () => {
        setShowForm(false);
        cancelWithRefresh();
    };

    return (
        <div className="add-word-form p-3 mb-2 pt-5">
            <h3>Add New Word Definition</h3>

            <WordFormComponent
                initialFormState={initialFormState}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitButtonText={isAdding ? "Adding..." : "Add"}
                disabled={isAdding}
            />
        </div>
    );
}

export default WordForm;