import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import React, {useEffect, useState} from "react";


/**
 * WordsList component that displays and manages a list of words.
 * It supports editing and deleting word entries and uses modals/forms for user interactions.
 *
 * @param {Object} props - Component props
 * @param {Array} props.words - Array of word objects to display
 * @param {Function} props.updateWord - Function to update a word
 * @param {Function} props.deleteWord - Function to delete a word
 * @param {boolean} props.isUpdating - Whether an update operation is in progress
 * @param {boolean} props.isDeleting - Whether a delete operation is in progress
 * @returns {JSX.Element} Rendered component
 * @constructor
 */
function WordsList({ words,
                       updateWord,
                       deleteWord,
                       isUpdating = false,
                       isDeleting = false,
                       forceCloseModals = false}){

    const [editingWord, setEditingWord] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);

    /**
     * useEffect hook to force-close all modals and forms when `forceCloseModals` becomes true.
     */
    useEffect(() => {
        if (forceCloseModals) {
            setEditingWord(null);
            setShowDeleteModal(false);
            setWordToDelete(null);
        }
    }, [forceCloseModals]);

    /**
     * Opens the delete confirmation modal for the selected word.
     * @param {Object} wordEntry - The word object to delete.
     */
    const handleDeleteClick = (wordEntry) => {
        setWordToDelete(wordEntry);
        setShowDeleteModal(true);
    };

    /**
     * Closes the delete confirmation modal.
     * Prevents closing if a delete operation is currently in progress.
     */
    const handleCloseDeleteModal = () => {
        if (isDeleting) return;     // Prevent closing while deletion is in progress
        setShowDeleteModal(false);
        setWordToDelete(null);
    };

    /**
     * Confirms deletion of the selected word by calling `deleteWord` and closing the modal.
     */
    const confirmDelete = () => {
        setShowDeleteModal(false);
        deleteWord(wordToDelete.id);
        setWordToDelete(null);
    };

    /**
     * Opens the edit form for the selected word.
     * @param {Object} wordEntry - The word object to edit.
     */
    const handleEditWord = (wordEntry) => {
        setEditingWord(wordEntry);
    };

    /**
     * Submits the updated word object and closes the edit form.
     * @param {Object} updatedWord - The updated word data.
     */
    const handleUpdateWord = (updatedWord) => {
        updateWord(updatedWord);
        setEditingWord(null); // Close edit form immediately
    };

    /**
     * Cancels editing mode. Disabled if an update is in progress.
     */
    const handleCancelEdit = () => {
        if (isUpdating) return; // Prevent canceling while update is in progress
        setEditingWord(null);
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
                                                isLoading={isUpdating}
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