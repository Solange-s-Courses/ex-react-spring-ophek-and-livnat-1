
/**
 * CityRow renders a single row in the city list with details and action buttons.
 *
 * @param {Object} props
 * @param {Object} props.wordEntry - The city object containing name, country, coordinates, and favorite status.
 * @param {function} props.onEdit - Callback to trigger editing the city.
 * @param {function} props.onDelete - Callback to trigger deleting the city.
 * @param {function} props.onToggleFavorite - Callback to toggle the city’s favorite status.
 * @returns {JSX.Element} A styled row showing city details and action buttons.
 * @constructor
 */
function WordRow({ wordEntry, onEdit, onDelete, onToggleFavorite }) {
    return (
        <div className="list-group-item p-3 border-start-0 border-end-0 border-top-0 border-bottom">
            <div className="row align-items-center">
                <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center">

                            <h5 className="mb-1 fw-bold">{wordEntry.word}, {wordEntry.category}</h5>
                            <div className="text-muted small d-flex align-items-center">
                                <i className="bi bi-geo-alt me-1"></i>
                                <span>Hint: {wordEntry.hint}</span>
                            </div>

                    </div>
                </div>

                <div className="col-12 col-md-6 mt-3 mt-md-0">
                    <div className="d-flex justify-content-md-end">
                        <button
                            className="btn btn-outline-secondary me-2 d-flex align-items-center"
                            onClick={onEdit}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                            className="btn btn-outline-danger d-flex align-items-center"
                            onClick={onDelete}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WordRow;