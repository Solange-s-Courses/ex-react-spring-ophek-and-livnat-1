import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import useDataApi from "../../customHooks/useDataApi";
import GameRules from "./GameRules";
import PlayerSetupForm from "./PlayerSetupForm"

/**
 * HomePage - Main entry page for the Hangman game.
 * Handles nickname/category input, validation, and navigation to the game screen.
 *
 * @returns {Element}
 * @constructor
 */
function HomePage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({nickname: '', category: ''});
    const [validation, setValidation] = useState({nickname: null, category: null});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [{ data, isLoading, isError, error }, setConfig, reset] = useDataApi({ url: '' }, null);

    /**
     * Handle user input changes.
     * @param e
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}));

        if (validation[name] === false) {
            setValidation((prev) => ({...prev, [name]: null}));
        }
    };

    /**
     * Close the error modal and reset relevant state.
     */
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setErrorMessage('');
        reset();
    };

    /**
     * Handle form submission and trigger the API call.
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nicknameValid = formData.nickname.trim() !== '';
        const categoryValid = !!formData.category;

        setValidation({
            nickname: nicknameValid ,
            category: categoryValid
        });

        if (nicknameValid && categoryValid) {
            setIsSubmitting(true);

            // Reset any previous data/errors before making new request
            // This prevents stale error states from interfering
            reset();

            // Use setConfig to trigger the API call
            setConfig({
                url: `/wordEntry/getRandomWord?category=${encodeURIComponent(formData.category)}`,
                method: 'GET',
                data: null,
                headers: {}
            });
        }
    };

    /**
     * Process the API response after submission.
     */
    useEffect(() => {

        // Only process responses when we're actively submitting
        if (!isSubmitting) return;

        if (!isLoading && data) {

            setIsSubmitting(false);
            navigate('/game', {
                state: {
                    wordEntry: data,
                    nickname: formData.nickname
                }
            });

        } else if (!isLoading && isError && error) {
            setErrorMessage(error);
            setShowDeleteModal(true);

            // Clean up after error
            setIsSubmitting(false);
            setFormData((prevState) => ({...prevState, category: ''}));
            setValidation((prev) => ({...prev, category: null}));
            setRefreshTrigger((prev) => !prev);
        }
    }, [data, isLoading, isError, error, isSubmitting, navigate, formData.nickname]);


    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-2 fw-bold mb-3 text-dark">HANGMAN</h1>
                    <p className="fs-4 text-dark">Test your vocabulary skills!</p>
                </div>

                <div className="row g-4">
                    <GameRules/>
                    <PlayerSetupForm
                        handleSubmit = {handleSubmit}
                        handleInputChange = {handleInputChange}
                        isSubmitting = {isSubmitting}
                        validation = {validation}
                        formData = {formData}
                        refreshTrigger = {refreshTrigger}
                    />
                </div>

                <div className="mt-5 text-center">
                    <p>© {new Date().getFullYear()} Hangman Game | Made with ❤️ for word lovers</p>
                </div>
            </div>

            {showDeleteModal && (
                <ErrorModal
                    show={showDeleteModal}
                    onClose={handleCloseDeleteModal}
                    message={errorMessage}
                />
            )}

        </div>
    );
}

export default HomePage;

