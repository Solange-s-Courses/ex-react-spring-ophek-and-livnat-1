import React from 'react';
import Select from 'react-select';
import useFetchCategories from '../../customHooks/useFetchCategories';

/**
 * CategoriesDropdown renders a select input using react-select.
 * It supports validation and scrollable dropdown.
 *
 * @param {Object} props
 * @param {function} props.handleChange - Callback when selected category changes.
 * @param {string} props.value - Currently selected category.
 * @param {boolean|null} props.isValid - Validation state (true, false, or null).
 * @param {string} props.id - HTML id for accessibility.
 * @param {boolean} props.disabled - Whether the dropdown is disabled.
 * @param {boolean} props.refreshTrigger - Trigger to refresh categories when toggled.
 * @returns {JSX.Element}
 */
function CategoriesDropdown({ handleChange, value, isValid, id, disabled = false, refreshTrigger = false }) {

    const { categories, loading, error } = useFetchCategories(refreshTrigger);

    // Handle error state
    const errorMessage = error ? 'Failed to load categories' : null;

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
                <div className="text-red-500 mt-1 text-sm">
                    {errorMessage}. Please try again later or contact support.
                </div>
            )}
        </div>
    );
}

export default CategoriesDropdown;