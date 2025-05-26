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


// import { Modal, Button } from 'react-bootstrap';
//
// /**
//  * Modal component that confirms if user wants to leave the game
//  * @param {boolean} show - Whether to show the modal
//  * @param {function} onCancel - Function to call when user cancels
//  * @param {function} onConfirm - Function to call when user confirms leaving
//  * @returns {JSX.Element} The game exit confirmation modal
//  */
// export default function GameExitModal({ show, onCancel, onConfirm }) {
//     return (
//         <Modal show={show} onHide={onCancel} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title className="text-warning">
//                     <i className="bi bi-exclamation-triangle me-2"></i>
//                     Leave Game?
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className="text-center">
//                     <i className="bi bi-controller text-muted mb-3" style={{ fontSize: '3rem' }}></i>
//                     <p className="mb-3">
//                         You are currently playing a game. If you navigate away now:
//                     </p>
//                     <div className="alert alert-warning">
//                         <ul className="mb-0 text-start">
//                             <li>Your current progress will be lost</li>
//                             <li>Your score will not be saved</li>
//                             <li>You'll need to start over</li>
//                         </ul>
//                     </div>
//                     <p className="fw-bold">Are you sure you want to leave?</p>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer className="justify-content-center">
//                 <Button variant="outline-secondary" onClick={onCancel} className="px-4">
//                     <i className="bi bi-arrow-left me-2"></i>
//                     Stay in Game
//                 </Button>
//                 <Button variant="danger" onClick={onConfirm} className="px-4">
//                     <i className="bi bi-box-arrow-right me-2"></i>
//                     Leave Game
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }