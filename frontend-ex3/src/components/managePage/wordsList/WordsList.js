import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import React, {useEffect, useState} from "react";


/**
 * WordsList component that displays and manages a list of words
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

    // Effect to handle forced closing of modals/forms when global error occurs
    useEffect(() => {
        if (forceCloseModals) {
            setEditingWord(null);
            setShowDeleteModal(false);
            setWordToDelete(null);
        }
    }, [forceCloseModals]);


    const handleDeleteClick = (wordEntry) => {
        setWordToDelete(wordEntry);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        if (isDeleting) return;     // Prevent closing while deletion is in progress
        setShowDeleteModal(false);
        setWordToDelete(null);
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        deleteWord(wordToDelete.id);
        setWordToDelete(null);
    };

    const handleEditWord = (wordEntry) => {
        setEditingWord(wordEntry);
    };


    const handleUpdateWord = (updatedWord) => {
        updateWord(updatedWord);
        setEditingWord(null); // Close edit form immediately
    };

    /**
     * Cancels the editing mode.
     */
    const handleCancelEdit = () => {
        if (isUpdating) return; // Prevent canceling while update is in progress
        setEditingWord(null);
    };

    return (
        <div className="mb-5 pt-5">
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