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
function WordForm({ addWord, setShowForm, isLoading = false, isError = false  }) {
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
        <div className="add-word-form">
            <h2>Add New Word</h2>

            {isError && (
                <div className="error-alert">
                    There was an error adding the word. Please try again.
                </div>
            )}
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