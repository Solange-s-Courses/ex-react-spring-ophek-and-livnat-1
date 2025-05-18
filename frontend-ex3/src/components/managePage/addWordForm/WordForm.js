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
function WordForm({ addWord, setShowForm }) {
    const initialFormState = {
        word: '',
        category: '',
        hint: ''
    };

    const handleSubmit = (formData) => {
        addWord(formData);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="add-word-form">
            <h2>Add New Word</h2>
            <WordFormComponent
                initialFormState={initialFormState}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitButtonText="Add"
            />
        </div>
    );
}

export default WordForm;