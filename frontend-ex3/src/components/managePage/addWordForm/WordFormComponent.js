import React, { useState } from 'react';

/**
 * WordFormComponent - Reusable form component for word operations
 *
 * @param {Object} props - Component props
 * @param {Object} props.initialFormState - Initial state of the form
 * @param {Function} props.onSubmit - Function to call when form is submitted
 * @param {Function} props.onCancel - Function to call when form is cancelled
 * @param {string} props.submitButtonText - Text to display on the submit button
 * @returns {JSX.Element} Rendered component
 */
function WordFormComponent({
                               initialFormState,
                               onSubmit,
                               onCancel,
                               submitButtonText = 'Submit',
                               disabled = false}) {

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    /**
     * Validates form data
     * @returns {boolean} True if valid, false otherwise
     */
    const validateForm = () => {
        const newErrors = {};

        if (!formData.word.trim()) {
            newErrors.word = 'Word is required';
        } else if (!/^[a-zA-Z]+$/.test(formData.word)) {
            newErrors.word = 'Word must contain only alphabetic characters';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        } else if (!/^[a-zA-Z]+$/.test(formData.category)) {
            newErrors.category = 'Category must contain only alphabetic characters';
        }

        if (!formData.hint.trim()) {
            newErrors.hint = 'Hint is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Handles input changes
     * @param {Event} e - The change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    /**
     * Handles form submission
     * @param {Event} e - The submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <form className="word-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="word">Word:</label>
                <input
                    type="text"
                    id="word"
                    name="word"
                    value={formData.word}
                    onChange={handleChange}
                    className={errors.word ? 'error' : ''}
                    disabled={disabled}
                />
                {errors.word && <span className="error-message">{errors.word}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={errors.category ? 'error' : ''}
                    disabled={disabled}
                />
                {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="hint">Hint:</label>
                <textarea
                    id="hint"
                    name="hint"
                    value={formData.hint}
                    onChange={handleChange}
                    className={errors.hint ? 'error' : ''}
                    disabled={disabled}
                />
                {errors.hint && <span className="error-message">{errors.hint}</span>}
            </div>

            <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={disabled}>
                    {submitButtonText}
                </button>
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={onCancel}
                    disabled={disabled}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default WordFormComponent;