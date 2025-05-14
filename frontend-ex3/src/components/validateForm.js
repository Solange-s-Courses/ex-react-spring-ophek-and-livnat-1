
/**
 * Validates a city name.
 *
 * - Allows letters and spaces only.
 * - Must be unique among existing cities (case-insensitive).
 * - If in edit mode and the name hasn't changed, it's considered valid.
 *
 */
export const validateWord = (value, words, currentWord= null) => {

    // If we're in edit mode and the name hasn't changed, it's valid
    if (currentWord && value === currentWord) return true;

    // Check if name is not empty and contains only letters
    const wordRegex = /^[a-zA-Z\s]+$/;
    if (!value || !wordRegex.test(value)) return false;

    // Check if name is unique
    const wordExists = words.some(word =>
        word.toLowerCase() === value.toLowerCase()
    );
    return !wordExists;
};

/**
 * Validates a country selection.
 *
 * @param {string} value - The selected country value.
 * @returns {boolean} - True if non-empty, false otherwise.
 */
export function validateCategory(value) {

    // Check if category is not empty and contains only letters
    const categoryRegex = /^[a-zA-Z\s]+$/;
    if (!value || !categoryRegex.test(value)) return false;
}

/**
 */
export function validateHint(value) {
    return value.trim() !== '';
}

