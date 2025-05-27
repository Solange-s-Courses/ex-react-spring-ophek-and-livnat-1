import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import React, {useEffect, useState} from "react";
import { useWordManagement } from '../../WordManagementContext';

/**
 * WordsList component that displays and manages a list of words.
 * Supports editing and deleting word entries using modals and inline forms.
 *
 * @returns {JSX.Element} Rendered component showing words table or empty state
 */
function WordsList(){

    const {
        words,
        updateWord,
        deleteWord,
        isUpdating,
        isDeleting,
        globalError,
        cancelWithRefresh
    } = useWordManagement();

    const [editingWord, setEditingWord] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);

    /**
     * Effect hook to force-close all modals and forms when a global error occurs.
     * This ensures that if an operation fails, any open UI elements are closed
     * and the user sees the error message clearly without interference.
     *
     * @param {Object|null} globalError - The current global error state from Context
     */
    useEffect(() => {
        if (globalError) {
            setEditingWord(null);
            setShowDeleteModal(false);
            setWordToDelete(null);
        }
    }, [globalError]);

    /**
     * Opens the delete confirmation modal for the selected word.
     * Sets up the modal state to show the confirmation dialog with the word's details.
     *
     * @param {Object} wordEntry - The word object to be deleted
     */
    const handleDeleteClick = (wordEntry) => {
        setWordToDelete(wordEntry);
        setShowDeleteModal(true);
    };

    /**
     * Closes the delete confirmation modal and refreshes data.
     * Refreshes to ensure we have latest data in case of external changes.
     */
    const handleCloseDeleteModal = () => {
        if (isDeleting) return;
        setShowDeleteModal(false);
        setWordToDelete(null);
        cancelWithRefresh();
    };

    /**
     * Confirms deletion of the selected word by calling the Context delete function.
     * Immediately closes the modal and initiates the delete operation.
     */
    const confirmDelete = () => {
        setShowDeleteModal(false);
        deleteWord(wordToDelete.id);
        setWordToDelete(null);
    };

    /**
     * Opens the inline edit form for the selected word.
     * Replaces the word's table row with an editable form component.
     *
     * @param {Object} wordEntry - The word object to be edited
     */
    const handleEditWord = (wordEntry) => {
        setEditingWord(wordEntry);
    };

    /**
     * Submits the updated word data and closes the edit form.
     * Immediately closes the edit form and delegates the update operation to the Context.
     *
     * @param {Object} updatedWord - The updated word data from the edit form
     */
    const handleUpdateWord = (updatedWord) => {
        updateWord(updatedWord);
        setEditingWord(null);
    };

    /**
     * Cancels editing mode and refreshes data.
     * Refreshes to ensure we have latest data in case of external changes.
     */
    const handleCancelEdit = () => {
        if (isUpdating) return;
        setEditingWord(null);
        cancelWithRefresh();
    };

    return (
        <div>
            {words.length > 0 ? (
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="mb-0">Definitions</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-light">
                            <tr>
                                <th>Word</th>
                                <th>Category</th>
                                <th>Hint</th>
                                <th className="text-end">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {words.map(word => (
                                editingWord?.id === word.id ? (
                                    <tr key={word.id}>
                                        <td colSpan="4" className="p-0 border-0">
                                            <WordEditForm
                                                wordEntry={word}
                                                updateWord={handleUpdateWord}
                                                cancelEditing={handleCancelEdit}
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    <WordRow
                                        key={word.id}
                                        wordEntry={word}
                                        onEdit={() => handleEditWord(word)}
                                        onDelete={() => handleDeleteClick(word)}
                                        disabled={isUpdating || isDeleting || !!editingWord}
                                    />
                                )
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info bg-light border-info d-flex align-items-center">
                    <i className="bi bi-info-circle me-3 fs-4"></i>
                    <p className="mb-0">
                        No words added yet, add your first word!
                    </p>
                </div>
            )}

            {showDeleteModal && (
                <DeleteConfirmationModal
                    show={showDeleteModal}
                    wordName={wordToDelete?.word}
                    onClose={handleCloseDeleteModal}
                    onConfirm={confirmDelete}
                    isLoading={isDeleting}
                />
            )}
        </div>
    );
}

export default WordsList;