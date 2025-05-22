import WordRow from './WordRow';
import WordEditForm from "../addWordForm/WordEditForm";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import React, {useEffect, useState} from "react";
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
                       isDeleting = false,isUpdateError = false, isDeleteError = false,
                   updateErrorMessage = null, deleteErrorMessage = null}) {

    const [editingWord, setEditingWord] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [wordToDelete, setWordToDelete] = useState(null);
    const [alert, setAlert] = useState(null);

    // Effect for handling delete errors
    useEffect(() => {
        if (isDeleteError) {
            setAlert({
                type: "danger",
                message: deleteErrorMessage
            });
        }
    }, [isDeleteError]);

    // Effect for handling update errors
    useEffect(() => {
        if (isUpdateError) {
            setAlert({
                type: "danger",
                message: updateErrorMessage
            });
        }
    }, [isUpdateError]);

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

    const handleCloseAlert = () => {
        setAlert(null);
    }

    /**
     * Cancels the editing mode.
     */
    const handleCancelEdit = () => {
        if (isUpdating) return; // Prevent canceling while update is in progress
        setEditingWord(null);
    };

    // return (
    //     <div className="mb-5">
    //         {alert && (
    //             <Alert
    //                 variant={alert.type}
    //                 className="mb-3"
    //                 dismissible
    //                 onClose={handleCloseAlert}
    //             >
    //                 {alert.message}
    //             </Alert>
    //         )}
    //
    //         {words.length > 0 ? (
    //             <div className="list-group">
    //                 {words.map(word => (
    //                     editingWord?.word === word.word ? (
    //                         <WordEditForm
    //                             key={word.id}
    //                             wordEntry={word}
    //                             updateWord={handleUpdateWord}
    //                             cancelEditing={handleCancelEdit}
    //                             isLoading={isUpdating}
    //                             isError={isUpdateError}
    //                         />
    //                     ) : (
    //                         <WordRow
    //                             key={word.id}
    //                             wordEntry={word}
    //                             onEdit={() => handleEditWord(word)}
    //                             onDelete={() => handleDeleteClick(word)}
    //                             disabled={isUpdating || isDeleting || !!editingWord}
    //                         />
    //                     )
    //                 ))}
    //             </div>
    //         ) : (
    //             <div className="alert alert-info bg-light border-info d-flex align-items-center">
    //                 <i className="bi bi-info-circle me-3 fs-4"></i>
    //                 <p className="mb-0">
    //                     No words added yet, add your first word!
    //                 </p>
    //             </div>
    //         )}
    //
    //         <DeleteConfirmationModal
    //             show={showDeleteModal}
    //             WordName={wordToDelete?.word}
    //             onClose={handleCloseDeleteModal}
    //             onConfirm={confirmDelete}
    //             isLoading={isDeleting}
    //         />
    //
    //     </div>
    // );
    return (
        <div className="mb-5 pt-5">
            {alert && (
                <Alert
                    variant={alert.type}
                    className="mb-3"
                    dismissible
                    onClose={handleCloseAlert}
                >
                    {alert.message}
                </Alert>
            )}

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
                                                isError={isUpdateError}
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

            <DeleteConfirmationModal
                show={showDeleteModal}
                wordName={wordToDelete?.word}
                onClose={handleCloseDeleteModal}
                onConfirm={confirmDelete}
                isLoading={isDeleting}
            />
        </div>
    );
}

export default WordsList;