import React,{useEffect} from 'react';
import Select from 'react-select';
import useFetchCategories from '../../customHooks/useFetchCategories';

/**
 * Renders a dropdown menu of categories fetched from an API.
 * Automatically disables the ability to start the game if the categories fail to load.
 *
 * @param {function} handleChange - Function to call when a category is selected.
 * @param {Object|null} value - The currently selected value in the dropdown.
 * @param {boolean|null} isValid - Validation status of the dropdown (true, false, or null).
 * @param {string} id - The ID for the dropdown input element.
 * @param {boolean} [disabled=false] - Whether the dropdown should be disabled.
 * @param {boolean} [refreshTrigger=false] - If true, re-fetches categories.
 * @param {function} setCanStartGame - Callback to control whether the game can start based on category fetch status.
 *
 * @returns {JSX.Element} A styled dropdown component populated with category options.
 * @constructor
 */
function CategoriesDropdown({ handleChange, value, isValid, id, disabled = false, refreshTrigger = false, setCanStartGame }) {

    const { categories, loading,isError, error } = useFetchCategories(refreshTrigger);
    const errorMessage = error ? 'Failed to load categories' : null;

    const displayedCategories = categories.map((category) => ({
        label: category,
        value: category
    }));

    /**
     * Controls whether the game can start based on category fetch status.
     */
    useEffect(() => {
        if (isError || (!loading && categories.length === 0)) {
            setCanStartGame(false);
        } else if (!loading && categories.length > 0) {
            setCanStartGame(true);
        }
    }, [isError, categories.length, loading, setCanStartGame]);

    /**
     * Handles selection of a category from the dropdown.
     * @param selectedOption - Selected option from the dropdown.
     */
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
                name="category"
                options={displayedCategories}
                value={value ? { label: value, value } : null}
                onChange={handleSelectChange}
                isLoading={loading}
                placeholder={loading ? "Loading categories..." : "Select a category"}
                classNamePrefix="react-select"
                className={`react-select-container ${isValid === false ? 'is-invalid' : isValid === true ? 'is-valid' : ''}`}
                isDisabled={disabled || loading || !!error}
            />
            {isValid === false && (
                <div className="invalid-feedback d-block">
                    Please select a category
                </div>
            )}
            {errorMessage && (
                <div className="invalid-feedback d-block">
                    {errorMessage}. Please try again later or contact support.
                </div>
            )}
        </div>
    );
}

export default CategoriesDropdown;