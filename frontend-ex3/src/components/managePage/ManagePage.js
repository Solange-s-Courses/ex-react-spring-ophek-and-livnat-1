import React, {useState, useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import WordsList from './wordsList/WordsList';
import WordForm from './addWordForm/WordForm';
import AddWordButton from "./AddWordButton";
import useDataApi from '../../customHooks/useDataApi';

/**
 * ManagePage component for managing words in the Hangman game
 * Allows viewing, adding, updating, and deleting word entries via API.
 *
 * @returns {JSX.Element} The full UI to manage all words
 * @constructor
 */
function ManagePage() {

    const [showForm, setShowForm] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    // API data fetching
    const [{ data: words, isLoading, isError }, fetchWords] = useDataApi(
        { url: '/wordEntry' },
        null
    );

    // API operations
    const [addWordState, doAddWord] = useDataApi();
    const [updateWordState, doUpdateWord] = useDataApi();
    const [deleteWordState, doDeleteWord] = useDataApi();

    /**
     * Displays a global error message and closes forms/modals.
     *
     * @param {string} operation - The operation type ('add', 'update', 'delete')
     * @param {string} errorMessage - The error message to display
     */
    const handleOperationError = (operation, errorMessage) => {
        setShowForm(false); // Close add form if open
        // WordsList will handle closing edit forms and delete modals via props
        setGlobalError({
            operation,
            message: errorMessage || 'An unexpected error occurred. Please try again.'
        });
    };

    /**
     * Returns a readable title based on the failed operation.
     *
     * @param {string} operation - The operation type
     * @returns {string} - Title message
     */
    const getErrorTitle = (operation) => {
        switch (operation) {
            case 'add': return 'Failed to Add Word';
            case 'update': return 'Failed to Update Word';
            case 'delete': return 'Failed to Delete Word';
            default: return 'Operation Failed';
        }
    };

    /**
     * Triggers refresh of words after an add operation.
     * Displays error if the add fails.
     */
    useEffect(() => {
        if (!addWordState.isLoading) {
            if (addWordState.isError) {
                handleOperationError('add', addWordState.error);
            } else if (addWordState.data) {
                // Success - close form and refresh list
                setShowForm(false);
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [addWordState]);

    /**
     * Triggers refresh of words after an update operation.
     * Displays error if the update fails.
     */
    useEffect(() => {
        if (!updateWordState.isLoading) {
            if (updateWordState.isError) {
                handleOperationError('update', updateWordState.error);
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [updateWordState]);

    /**
     * Triggers refresh of words after a delete operation.
     * Displays error if the delete fails.
     */
    useEffect(() => {
        if (!deleteWordState.isLoading) {
            if (deleteWordState.isError) {
                handleOperationError('delete', deleteWordState.error);
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [deleteWordState]);

    /**
     * Sends a POST request to add a new word to the backend.
     * @param {Object} word - The word to add
     */
    const addWord = async (word) => {
        setGlobalError(null); // Clear any existing errors
        doAddWord({
            url: '/wordEntry/add',
            method: 'POST',
            data: word
        });
    };

    /**
     * Sends a PUT request to update an existing word.
     * @param {Object} updatedWord - The updated word data
     */
    const updateWord = async (updatedWord) => {
        setGlobalError(null); // Clear any existing errors
        doUpdateWord({
            url: `/wordEntry/update/${updatedWord.id}`,
            method: 'PUT',
            data: updatedWord
        });
    };

    /**
     * ends a DELETE request to remove a word by ID.
     * @param {string} wordId - The ID of the word to delete
     */
    const deleteWord = async (wordId) => {
        setGlobalError(null); // Clear any existing errors
        doDeleteWord({
            url: `/wordEntry/delete/${wordId}`,
            method: 'DELETE'
        });
    };

    /**
     * Closes the global error alert.
     */
    const handleCloseGlobalError = () => {
        setGlobalError(null);
    };

    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-9">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Manage Words</h2>
                        </div>

                        {/* Global Error Alert */}
                        {globalError && (
                            <Alert
                                variant="danger"
                                className="mb-4"
                                dismissible
                                onClose={handleCloseGlobalError}
                            >
                                <Alert.Heading>{getErrorTitle(globalError.operation)}</Alert.Heading>
                                <p className="mb-0">{globalError.message}</p>
                            </Alert>
                        )}

                        {isLoading ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : isError ? (
                            <div className="alert alert-danger">
                                <p className="mb-2">Error loading words. Please try again.</p>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => fetchWords({ url: '/wordEntry' })}
                                >
                                    Retry
                                </button>
                            </div>
                        ) : words ? (
                            <>
                                {showForm ? (
                                    <WordForm
                                        addWord={addWord}
                                        setShowForm={setShowForm}
                                        isLoading={addWordState.isLoading}
                                    />
                                ) : (
                                    <>
                                        <AddWordButton
                                        onClick={() => setShowForm(true)}
                                        />

                                        <WordsList
                                            words={words}
                                            updateWord={updateWord}
                                            deleteWord={deleteWord}
                                            isUpdating={updateWordState.isLoading}
                                            isDeleting={deleteWordState.isLoading}
                                            forceCloseModals={!!globalError}
                                        />

                                    </>
                                )}
                            </>
                        ) : null }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagePage;