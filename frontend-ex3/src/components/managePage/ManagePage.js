
import React, {useState, useEffect} from 'react';
import {Alert} from 'react-bootstrap';
import WordsList from './wordsList/WordsList';
import WordForm from './addWordForm/WordForm';
import AddWordButton from "./AddWordButton";
import useDataApi from '../../customHooks/useDataApi';
/**
 * ManagePage component for managing words in the Hangman game
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

    // Helper function to close all modals/forms and show error
    const handleOperationError = (operation, errorMessage) => {
        setShowForm(false); // Close add form if open
        // WordsList will handle closing edit forms and delete modals via props
        setGlobalError({
            operation,
            message: errorMessage || 'An unexpected error occurred. Please try again.'
        });
    };

    const getErrorTitle = (operation) => {
        switch (operation) {
            case 'add': return 'Failed to Add Word';
            case 'update': return 'Failed to Update Word';
            case 'delete': return 'Failed to Delete Word';
            default: return 'Operation Failed';
        }
    };


    // Monitor CRUD operation states to refresh the main list when they complete
    useEffect(() => {
        if (!addWordState.isLoading) {
            if (addWordState.isError) {
                handleOperationError('add', addWordState.error);
            } else if (addWordState.data) {
                // Success - close form and refresh list
                setShowForm(false);
                //fetchWords({ url: '/wordEntry' });
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [addWordState]);

    useEffect(() => {
        if (!updateWordState.isLoading) {
            if (updateWordState.isError) {
                handleOperationError('update', updateWordState.error);
            } else if (updateWordState.data) {
                // Success - refresh list
                //fetchWords({ url: '/wordEntry' });
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [updateWordState]);

    useEffect(() => {
        if (!deleteWordState.isLoading) {
            if (deleteWordState.isError) {
                handleOperationError('delete', deleteWordState.error);
            } else if (deleteWordState.data) {
                // Success - refresh list
                //fetchWords({ url: '/wordEntry' });
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [deleteWordState]);

    /**
     * Adds a new word
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
     * Updates an existing word
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
     * Deletes a word
     * @param {string} wordId - The ID of the word to delete
     */
    const deleteWord = async (wordId) => {
        setGlobalError(null); // Clear any existing errors
        doDeleteWord({
            url: `/wordEntry/delete/${wordId}`,
            method: 'DELETE'
        });
    };

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