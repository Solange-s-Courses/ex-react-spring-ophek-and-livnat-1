import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import {useState} from "react";

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
function WordsList({ words, updateWord, deleteWord, isUpdating = false, isDeleting = false }) {

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
        setEditingWord(null);
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