import React, {useEffect, useState} from 'react';
import useDataApi from '../../../customHooks/useDataApi';

/**
 * WordFormComponent - Reusable form component for word operations.
 * Provides form fields for `word`, `category`, and `hint` and ensures
 * that the word is unique (if creating) using the /exists API.
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

    // API check for existing word
    const [{ data: validationResult, isLoading: isCheckingWord, isError, error }, checkWordExists] = useDataApi(
        { url: '' },
        null
    );

    /**
     * Effect to handle word uniqueness check results
     */
    useEffect(() => {
        // Only process completed API calls
        if (!isCheckingWord && (validationResult !== null || isError)) {
            if (isError) {
                // Any error is a real server error
                setErrors(prev => ({
                    ...prev,
                    server: 'Server error, please try again later'
                }));
            } else if (validationResult) {
                // Check the validation result
                if (validationResult.exists) {
                    // Word already exists
                    setErrors(prev => ({
                        ...prev,
                        word: 'This word already exists'
                    }));
                } else {
                    // Word doesn't exist, can proceed with submission
                    onSubmit(formData);
                }
            }
        }
    }, [validationResult, isCheckingWord, isError, error]);//, formData, onSubmit]);


    /**
     * Performs basic client-side validation on the form
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
     * Updates form state and clears field-level error
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
     * Handles submission:
     * - Runs validation
     * - Triggers word uniqueness check or directly submits
     * @param {Event} e - The submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear any previous server errors
        if (errors.server) {
            setErrors(prev => ({...prev, server: null}));
        }

        if (validateForm()) {

            // Check if we're editing an existing word or adding a new one
            const isEditing = initialFormState.id !== undefined;

            // check for uniqueness if we're adding a new word, or editing and the word value has changed
            if (!isEditing || formData.word.toLowerCase() !== initialFormState.word.toLowerCase()) {
                checkWordExists({
                    url: `/wordEntry/word/${formData.word}/exists`,
                    method: 'GET'
                });
            } else {
                // If editing and word didn't change, submit directly
                onSubmit(formData);
            }
        }
    };

    return (
        <form className="card shadow-sm p-4" onSubmit={handleSubmit}>

            {/* Server Error Alert */}
            {errors.server && (
                <div className="alert alert-danger mb-4" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {errors.server}
                </div>
            )}

            {/* Word Input */}
            <div className="mb-3">
                <label htmlFor="word" className="form-label">Word:</label>
                <input
                    type="text"
                    className={`form-control ${errors.word ? 'is-invalid' : ''}`}
                    id="word"
                    name="word"
                    value={formData.word}
                    onChange={handleChange}
                    disabled={disabled}
                />
                {errors.word && (
                    <div className="invalid-feedback">
                        {errors.word}
                    </div>
                )}
            </div>

            {/* Category Input */}
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category:</label>
                <input
                    type="text"
                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    disabled={disabled}
                />
                {errors.category && (
                    <div className="invalid-feedback">
                        {errors.category}
                    </div>
                )}
            </div>

            {/* Hint Input */}
            <div className="mb-4">
                <label htmlFor="hint" className="form-label">Hint:</label>
                <textarea
                    className={`form-control ${errors.hint ? 'is-invalid' : ''}`}
                    id="hint"
                    name="hint"
                    rows="3"
                    value={formData.hint}
                    onChange={handleChange}
                    disabled={disabled}
                />
                {errors.hint && (
                    <div className="invalid-feedback">
                        {errors.hint}
                    </div>
                )}
            </div>

            {/* Form Actions */}
            <div className="d-flex justify-content-end gap-2">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                    disabled={isCheckingWord || disabled}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isCheckingWord ||disabled}
                >
                    {isCheckingWord ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Checking...
                        </>
                    ) : submitButtonText}
                </button>
            </div>
        </form>
    );
}

export default WordFormComponent;