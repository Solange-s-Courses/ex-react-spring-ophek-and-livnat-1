import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import React, {useState} from "react";
import {Alert} from "react-bootstrap";

/**
 * WordsList component that displays and manages a list of words
 *
 * @param {Object} props - Component props
 * @param {Array} props.words - Array of word objects to display
 * @param {Function} props.updateWord - Function to update a word
 * @param {Function} props.deleteWord - Function to delete a word
 * @param {boolean} props.isUpdating - Whether an update operation is in progress
 * @param {boolean} props.isDeleting - Whether a delete operation is in progress
 * @param {boolean} props.isUpdateError - Whether there was an error during update
 * @param {boolean} props.isDeleteError - Whether there was an error during delete
 * @returns {JSX.Element} Rendered component
 * @constructor
 */
function WordsList({ words, updateWord, deleteWord, isUpdating = false,
                       isDeleting = false,isUpdateError = false, isDeleteError = false }) {

    const [editingWord, setEditingWord] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);


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
        deleteWord(wordToDelete.id);
        setShowDeleteModal(false);
        setWordToDelete(null);
    };

    const handleEditWord = (wordEntry) => {
        setEditingWord(wordEntry);
    };


    const handleUpdateWord = (updatedWord) => {
        updateWord(updatedWord);
        if(!isUpdateError){
            setEditingWord(null);
        }
    };

    /**
     * Cancels the editing mode.
     */
    const handleCancelEdit = () => {
        if (isUpdating) return; // Prevent canceling while update is in progress
        setEditingWord(null);
    };

    return (
        <div className="mb-5">
            {isDeleteError && (
                <Alert variant="danger" className="mb-3">
                    Failed to delete word. Please try again.
                </Alert>
            )}

            {isUpdateError && (
                <Alert variant="danger" className="mb-3" >
                    Failed to update word. Please try again.
                </Alert>
            )}

            {words.length > 0 ? (
                <div className="list-group">
                    {words.map(word => (
                        editingWord?.word === word.word ? (
                            <WordEditForm
                                key={word.id}
                                wordEntry={word}
                                updateWord={handleUpdateWord}
                                cancelEditing={handleCancelEdit}
                                isLoading={isUpdating}
                                isError={isUpdateError}
                            />
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
                </div>
            ) : (
                <div className="alert alert-info bg-light border-info d-flex align-items-center">
                    <i className="bi bi-info-circle me-3 fs-4"></i>
                    <p className="mb-0">
                        No words added yet, add your first word!
                    </p>
                </div>
            )}

            <DeleteConfirmationModal
                show={showDeleteModal}
                WordName={wordToDelete?.word}
                onClose={handleCloseDeleteModal}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />

        </div>
    );
}

export default WordsList;