
import CityFormComponent from './WordFormComponent';

/**
 * CityForm component handles the creation of a new city entry.
 * It wraps the reusable CityFormComponent and manages submission and cancellation logic.
 *
 * @param {Object} props
 * @param {Array<Object>} props.cities - Array of existing city objects.
 * @param {function} props.addCity - Callback to add a new city.
 * @param {function} props.setShowForm - Callback to control the visibility of the form.
 * @returns {JSX.Element} The form for adding a new city.
 * @constructor
 */
function CityForm({ cities, addCity, setShowForm }) {

    /**
     * Handles saving a new city with form data.
     * Adds the city with `isFavorite` set to false and closes the form.
     *
     * @param {Object} formData - Data submitted from the form.
     */
    const handleSaveCity = (formData) => {
        // Create a new city object with the form data and set isFavorite to false
        const newCity = {
            ...formData,
            isFavorite: false
        };

        addCity(newCity);
        setShowForm(false);
    };

    /**
     * Cancels the form and hides it without saving.
     */
    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <CityFormComponent
            cities={cities}
            onSave={handleSaveCity}
            onCancel={handleCancel}
            isEditing={false}
        />
    );
}

export default CityForm;