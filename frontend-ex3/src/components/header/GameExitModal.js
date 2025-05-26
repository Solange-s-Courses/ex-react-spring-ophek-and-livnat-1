import { Modal, Button } from 'react-bootstrap';

/**
 * Modal component that confirms if user wants to leave the game
 * @param {boolean} show - Whether to show the modal
 * @param {function} onCancel - Function to call when user cancels
 * @param {function} onConfirm - Function to call when user confirms leaving
 * @returns {JSX.Element} The game exit confirmation modal
 */
export default function GameExitModal({ show, onCancel, onConfirm }) {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    Leave Game?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <i className="bi bi-controller text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                    <p className="mb-3">
                        You are currently playing a game. If you navigate away now:
                    </p>
                    <div className="alert alert-warning">
                        <ul className="mb-0 text-start">
                            <li>Your current progress will be lost</li>
                            <li>Your score will not be saved</li>
                            <li>You'll need to start over</li>
                        </ul>
                    </div>
                    <p className="fw-bold">Are you sure you want to leave?</p>
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="outline-secondary" onClick={onCancel} className="px-4">
                    <i className="bi bi-arrow-left me-2"></i>
                    Stay in Game
                </Button>
                <Button variant="danger" onClick={onConfirm} className="px-4">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Leave Game
                </Button>
            </Modal.Footer>
        </Modal>
    );
}