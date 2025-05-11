
import Select from 'react-select';
import useFetchCountries from '../../../customHooks/useFetchCategories';

/**
 * CountriesDropdown renders a select input using react-select.
 * It supports validation and scrollable dropdown.
 *
 * @param {Object} props
 * @param {function} props.handleChange - Callback when selected country changes.
 * @param {string} props.value - Currently selected country.
 * @param {boolean|null} props.isValid - Validation state (true, false, or null).
 * @param {string} props.id - HTML id for accessibility.
 * @returns {JSX.Element}
 */
function CategoriesDropdown({ handleChange, value, isValid, id }) {
    const { categories, loading, error } = useFetchCountries();

    // what to do if we have an error?

    const displayedCategories = categories.map((category) => ({
        label: category,
        value: category
    }));

    const handleSelectChange = (selectedOption) => {
        handleChange({
            target: {
                name: 'category',
                value: selectedOption?.value || ''
            }
        });
    };

    return (
        <div className="mb-2">
            <Select
                inputId={id}
                name="country"
                options={displayedCategories}
                value={value ? { label: value, value } : null}
                onChange={handleSelectChange}
                isLoading={loading}
                placeholder={loading ? "Loading categories..." : "Select a category"}
                classNamePrefix="react-select"
                className={`react-select-container ${isValid === false ? 'is-invalid' : isValid === true ? 'is-valid' : ''}`}
            />
            {isValid === false && (
                <div className="invalid-feedback d-block">
                    Please select a category
                </div>
            )}
        </div>
    );
}

export default CategoriesDropdown;