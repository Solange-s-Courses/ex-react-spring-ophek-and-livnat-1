import React from 'react';
import {Alert} from 'react-bootstrap';
import WordsList from './wordsList/WordsList';
import WordForm from './addWordForm/WordForm';
import AddWordButton from "./AddWordButton";
import { useWordManagement } from '../WordManagementContext';

/**
 * The main content component for the Manage Words page.
 * Displays the word management interface including forms, lists, and error messages.
 * Uses WordManagementContext to access all word-related state and operations.
 *
 * @returns {JSX.Element} The rendered manage page content
 */
function ManagePageContent() {

    const {
        words,
        isLoading,
        isError,
        showForm,
        globalError,
        getErrorTitle,
        handleCloseGlobalError,
        refreshWords
    } = useWordManagement();

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
                                    onClick={refreshWords}
                                >
                                    Retry
                                </button>
                            </div>
                        ) : words ? (
                            <>
                                {showForm ? (
                                    <WordForm />
                                ) : (
                                    <>
                                        <AddWordButton/>
                                        <WordsList />
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

export default ManagePageContent