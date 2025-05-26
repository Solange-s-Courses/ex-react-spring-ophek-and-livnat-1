
import { Modal, Button } from 'react-bootstrap';

/**
 * A styled error modal to display error messages with a visual indicator.
 *
 * @param {boolean} show - Controls visibility of the modal.
 * @param {function} onClose - Function to close the modal.
 * @param {string} message - The error message to display.
 * @param {string} [title="Something went wrong"] - Optional title of the modal.
 * @returns {JSX.Element}
 * @constructor
 */
function ErrorModal({ show, onClose, message, title = "Something went wrong" }) {
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
                        <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '2.5rem' }}></i>
                    </div>
                </div>

                {/* Title */}
                <h4 className="fw-semibold text-dark mb-3">
                    {title}
                </h4>

                {/* Message */}
                <p className="text-muted mb-4 lh-base">
                    {message}
                </p>

                {/* Action Button */}
                <div className="d-grid gap-2">
                    <Button
                        variant="danger"
                        onClick={onClose}
                        className="fw-medium"
                        size="lg">
                        Got it
                    </Button>
                </div>

                {/* Close button in top-right */}
                <Button
                    variant="link"
                    className="btn-close position-absolute top-0 end-0 m-3"
                    onClick={onClose}
                    aria-label="Close"
                    style={{ textDecoration: 'none' }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ErrorModal;

//
// import { Modal, Button } from 'react-bootstrap';
//
// function ErrorModal({ show, onClose, message }) {
//     return (
//         <Modal show={show} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Something went wrong</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>{message}</p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Close
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// }
//
// export default ErrorModal;