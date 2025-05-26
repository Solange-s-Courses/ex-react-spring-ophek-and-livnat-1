
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * DeleteConfirmationModal displays a modal dialog asking the user to confirm deletion of a word.
 *
 * @param {Object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {string} props.wordName - Name of the word to show in the confirmation message.
 * @param {function} props.onClose - Callback to close the modal without deleting.
 * @param {function} props.onConfirm - Callback to confirm and proceed with deletion.
 * @param {boolean} props.isLoading - Whether the delete operation is in progress
 * @returns {JSX.Element} The modal confirmation dialog.
 * @constructor
 */
const DeleteConfirmationModal = ({ show, wordName, onClose, onConfirm, isLoading = false  }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton disabled={isLoading}>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Are you sure you want to delete ${wordName}?`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
                    {isLoading ? "Deleting..." : "Delete"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;