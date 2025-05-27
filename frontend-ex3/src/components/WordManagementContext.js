import React, { createContext, useContext, useState, useEffect } from 'react';
import useDataApi from '../customHooks/useDataApi';

/**
 * Context for managing word operations throughout the application.
 * Provides centralized state management for word CRUD operations,
 * loading states, error handling, and UI state management.
 */
const WordManagementContext = createContext();

/**
 * Custom hook to access the WordManagementContext.
 * Must be used within a WordManagementProvider component.
 *
 * @returns {Object} Context value containing all word management functionality
 * @throws {Error} When used outside of WordManagementProvider
 *
 */
export const useWordManagement = () => {
    const context = useContext(WordManagementContext);
    if (!context) {
        throw new Error('useWordManagement must be used within a WordManagementProvider');
    }
    return context;
};

/**
 * Provider component that wraps the application with word management functionality.
 * Handles all API operations, state management, and error handling for word operations.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 * @returns {JSX.Element} Provider component wrapping children with context
 */
export const WordManagementProvider = ({ children }) => {
    // State for UI management
    const [showForm, setShowForm] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    // API data fetching for words list
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
     * Used when API operations fail to provide user feedback.
     *
     * @param {string} operation - The operation type ('add', 'update', 'delete')
     * @param {string} errorMessage - The error message to display to the user
     */
    const handleOperationError = (operation, errorMessage) => {
        setShowForm(false);
        setGlobalError({
            operation,
            message: errorMessage || 'An unexpected error occurred. Please try again.'
        });
    };

    /**
     * Returns a user-friendly title based on the failed operation.
     * Used for displaying appropriate error messages in the UI.
     *
     * @param {string} operation - The operation type ('add', 'update', 'delete')
     * @returns {string} Human-readable title for the error message
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
     * Effect hook to handle add word operation results.
     * Automatically refreshes the word list after successful/failed add operations.
     * Displays error messages if the add operation fails.
     */
    useEffect(() => {
        if (!addWordState.isLoading) {
            if (addWordState.isError) {
                handleOperationError('add', addWordState.error);
            } else if (addWordState.data) {
                setShowForm(false);
            }
            fetchWords({ url: '/wordEntry' });
        }
    }, [addWordState]);

    /**
     * Effect hook to handle update word operation results.
     * Automatically refreshes the word list after successful/failed update operations.
     * Displays error messages if the update operation fails.
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
     * Effect hook to handle delete word operation results.
     * Automatically refreshes the word list after successful/failed delete operations.
     * Displays error messages if the delete operation fails.
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
     * Clears any existing global errors before attempting the operation.
     *
     * @param {Object} word - The word object to add
     */
    const addWord = async (word) => {
        setGlobalError(null);
        doAddWord({
            url: '/wordEntry/add',
            method: 'POST',
            data: word
        });
    };

    /**
     * Sends a PUT request to update an existing word.
     * Clears any existing global errors before attempting the operation.
     *
     * @param {Object} updatedWord - The updated word data
     */
    const updateWord = async (updatedWord) => {
        setGlobalError(null);
        doUpdateWord({
            url: `/wordEntry/update/${updatedWord.id}`,
            method: 'PUT',
            data: updatedWord
        });
    };

    /**
     * Sends a DELETE request to remove a word by ID.
     * Clears any existing global errors before attempting the operation.
     *
     * @param {string} wordId - The unique identifier of the word to delete
     */
    const deleteWord = async (wordId) => {
        setGlobalError(null);
        doDeleteWord({
            url: `/wordEntry/delete/${wordId}`,
            method: 'DELETE'
        });
    };

    /**
     * Closes the global error alert.
     * Used when the user dismisses error messages from the UI.
     */
    const handleCloseGlobalError = () => {
        setGlobalError(null);
    };

    /**
     * Refreshes the words list by fetching the latest data from the backend.
     * Useful when canceling operations to ensure we have the most current data,
     * in case there were external changes that aren't visible in the current view.
     */
    const refreshWords = () => {
        fetchWords({ url: '/wordEntry' });
    };

    /**
     * Enhanced cancel function that refreshes data after canceling operations.
     * Use this when canceling operations that might leave stale data visible.
     * Ensures the user sees the most up-to-date information after canceling.
     */
    const cancelWithRefresh = () => {
        refreshWords();
    };

    /**
     * Context value object containing all state, functions, and data
     * that child components can access through the useWordManagement hook.
     *
     * @type {Object}
     * @property {Array} words - Array of word objects from the backend
     * @property {boolean} isLoading - Whether the initial words fetch is in progress
     * @property {boolean} isError - Whether there was an error fetching words
     * @property {boolean} showForm - Whether the add word form should be displayed
     * @property {Function} setShowForm - Function to show/hide the add word form
     * @property {Object|null} globalError - Current global error state with operation and message
     * @property {Function} addWord - Function to add a new word
     * @property {Function} updateWord - Function to update an existing word
     * @property {Function} deleteWord - Function to delete a word by ID
     * @property {boolean} isAdding - Whether an add operation is in progress
     * @property {boolean} isUpdating - Whether an update operation is in progress
     * @property {boolean} isDeleting - Whether a delete operation is in progress
     * @property {Function} getErrorTitle - Function to get user-friendly error titles
     * @property {Function} handleCloseGlobalError - Function to dismiss global errors
     * @property {Function} refreshWords - Function to refresh the words list
     * @property {Function} cancelWithRefresh - Function to cancel operations with data refresh
     */

        // Context value - everything we want to share with child components
    const contextValue = {
            // Data
            words,
            isLoading,
            isError,

            // UI State
            showForm,
            setShowForm,
            globalError,

            // Operations
            addWord,
            updateWord,
            deleteWord,

            // Loading states for operations
            isAdding: addWordState.isLoading,
            isUpdating: updateWordState.isLoading,
            isDeleting: deleteWordState.isLoading,

            // Helper functions
            getErrorTitle,
            handleCloseGlobalError,

            // Refresh functions
            refreshWords,
            cancelWithRefresh
        };

    return (
        <WordManagementContext.Provider value={contextValue}>
            {children}
        </WordManagementContext.Provider>
    );
};