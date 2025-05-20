import React from 'react';
import WordFormComponent from './WordFormComponent';
import {Alert} from 'react-bootstrap';

/**
 * WordForm component for adding a new word
 *
 * @param {Object} props - Component props
 * @param {Function} props.addWord - Function to add a new word
 * @param {Function} props.setShowForm - Function to control form visibility
 * @returns {JSX.Element} Rendered component
 */
function WordForm({ addWord, setShowForm, isLoading = false, isError = false, errorMessage=null}) {
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
        <div className="add-word-form p-3 border rounded mb-2">
            <h2>Add New Word</h2>

            {isError && (
                <Alert variant="danger" className="mb-3">
                    {errorMessage}
                </Alert>
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