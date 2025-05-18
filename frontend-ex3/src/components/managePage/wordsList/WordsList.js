import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import {useState} from "react";

/**
 * @param words
 * @param updateWord
 * @param deleteWord
 * @returns {JSX.Element}
 * @constructor
 */
function WordsList({ words, updateWord, deleteWord}) {

    const [editingWord, setEditingWord] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);


    const handleDeleteClick = (wordEntry) => {
        setWordToDelete(wordEntry);
        setShowDeleteModal(true);
    };


    const handleCloseDeleteModal = () => {
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
        updateWord(editingWord.id, updatedWord);
        setEditingWord(null);
    };

    /**
     * Cancels the editing mode.
     */
    const handleCancelEdit = () => {
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
                            />
                        ) : (
                            <WordRow
                                key={word.id}
                                wordEntry={word}
                                onEdit={() => handleEditWord(word)}
                                onDelete={() => handleDeleteClick(word)}
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
                WordName={wordToDelete.word}
                onClose={handleCloseDeleteModal}
                onConfirm={confirmDelete}
            />

        </div>
    );
}

export default WordsList;