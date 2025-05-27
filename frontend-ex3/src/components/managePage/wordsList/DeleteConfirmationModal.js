import React from 'react';
import { Modal, Button } from 'react-bootstrap';

/**
 * DeleteConfirmationModal displays a styled modal dialog asking the user to confirm deletion of a word.
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
const DeleteConfirmationModal = ({ show, wordName, onClose, onConfirm, isLoading = false }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            size="sm"
            backdrop="static">
            <Modal.Body className="text-center p-4">
                <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle"
                         style={{ width: '80px', height: '80px' }}>
                        <i className="bi bi-trash-fill text-danger" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                </div>

                {/* Title */}
                <h4 className="fw-semibold text-dark mb-3">
                    Delete Confirmation
                </h4>

                {/* Message */}
                <p className="text-muted mb-4 lh-base">
                    Are you sure you want to delete <strong>{wordName}</strong>? This action cannot be undone.
                </p>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        className="fw-medium"
                        size="lg"
                        disabled={isLoading}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                    <Button
                        variant="outline-secondary"
                        onClick={onClose}
                        className="fw-medium"
                        size="lg"
                        disabled={isLoading}>
                        Cancel
                    </Button>
                </div>

                {/* Close button in top-right */}
                <Button
                    variant="link"
                    className="btn-close position-absolute top-0 end-0 m-3"
                    onClick={onClose}
                    aria-label="Close"
                    disabled={isLoading}
                    style={{ textDecoration: 'none' }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default DeleteConfirmationModal;