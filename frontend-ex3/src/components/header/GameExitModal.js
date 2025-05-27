import { Modal, Button } from 'react-bootstrap';

/**
 * A confirmation modal shown when the user attempts to leave the game.
 *
 * Features:
 * - Prevents accidental game exit by warning the user
 * - Displays a warning icon, title, message, and two buttons: cancel or confirm
 * - Triggered when user tries to navigate away from the game page
 *
 * @param {Object} props
 * @param {boolean} props.show - Controls whether the modal is visible.
 * @param {function} props.onCancel - Callback for when the user decides to stay in the game.
 * @param {function} props.onConfirm - Callback for when the user confirms exiting the game.
 * @returns {JSX.Element} The exit confirmation modal.
 * @constructor
 */
function GameExitModal({ show, onCancel, onConfirm }) {
    return (
        <Modal
            show={show}
            onHide={onCancel}
            centered
            size="sm"
            backdrop="static"
        >
            <Modal.Body className="text-center p-4">
                {/* Icon Circle */}
                <div className="mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle"
                         style={{ width: '80px', height: '80px' }}>
                        <i className="bi bi-box-arrow-right text-warning" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                </div>

                {/* Title */}
                <h4 className="fw-semibold text-dark mb-3">Leave Game?</h4>

                {/* Message */}
                <p className="text-muted mb-4 lh-base">
                    Your progress will be lost and your score won’t be saved.
                    Are you sure you want to exit?
                </p>

                {/* Buttons */}
                <div className="d-grid gap-2">
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        className="fw-medium"
                        size="lg">
                        Stay in Game
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        className="fw-medium"
                        size="lg">
                        Leave Game
                    </Button>
                </div>

                {/* Close button top-right */}
                <Button
                    variant="link"
                    className="btn-close position-absolute top-0 end-0 m-3"
                    onClick={onCancel}
                    aria-label="Close"
                    style={{ textDecoration: 'none' }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default GameExitModal;
