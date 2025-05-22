import React from 'react';
import WordFormComponent from './WordFormComponent';

/**
 * WordForm component for adding a new word
 *
 * @param {Object} props - Component props
 * @param {Function} props.addWord - Function to add a new word
 * @param {Function} props.setShowForm - Function to control form visibility
 * @returns {JSX.Element} Rendered component
 */
function WordForm({ addWord, setShowForm, isLoading = false}) {
    const initialFormState = {
        word: '',
        category: '',
        hint: ''
    };

    const handleSubmit = (formData) => {
        addWord(formData);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="add-word-form p-3 border rounded mb-2 pt-5">
            <h3>Add New Word Definition</h3>

            <WordFormComponent
                initialFormState={initialFormState}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitButtonText={isLoading ? "Adding..." : "Add"}
                disabled={isLoading}
            />
        </div>
    );
}

export default WordForm;