/**
 * A modern add word button component using only Bootstrap classes.
 * @returns {JSX.Element}
 * @constructor
 */
function AddWordButton({ onClick }) {
    return (
        <div className="mb-5 pt-5 d-grid d-md-flex justify-content-center">
            <button
                className="btn btn-primary py-2 px-4 rounded-3 shadow-sm"
                onClick={onClick}
            >
                <div className="d-flex align-items-center justify-content-center">
                    <i className="bi bi-plus-circle me-2"></i>
                    <span>Add New Word Entry</span>
                </div>
            </button>
        </div>
    );
}

export default AddWordButton;