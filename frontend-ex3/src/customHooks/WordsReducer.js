/**
 * Action types for word management operations
 * @type {{ADD_WORD: string, UPDATE_WORD: string, DELETE_WORD: string, INIT_WORDS: string}}
 */
export const ACTION_TYPES = {
    ADD_WORD: 'ADD_WORD',
    UPDATE_WORD: 'UPDATE_WORD',
    DELETE_WORD: 'DELETE_WORD',
    INIT_WORDS: 'INIT_WORDS'
};

/**
 * Reducer function to manage the state of words.
 * It handles different actions like adding, updating,
 * deleting words, and initializing from storage.
 *
 * @param {Array} state - The current state of words.
 * @param {Object} action - An action with a `type` and optional `payload`.
 * @param {string} action.type - The type of action to perform.
 * @param {*} action.payload - The data needed to perform the action.
 *
 * @returns {Array} The updated state after the action is applied.
 */
const wordsReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.INIT_WORDS:
            return action.payload;

        case ACTION_TYPES.ADD_WORD:
            return [...state, action.payload];

        case ACTION_TYPES.UPDATE_WORD:
            return state.map(word =>
                word.id === action.payload.id
                    ? { ...action.payload }
                    : word
            );

        case ACTION_TYPES.DELETE_WORD:
            // Remove a word from the state by id
            return state.filter(word => word.id !== action.payload);

        default:
            // Return current state if action type is unrecognized
            return state;
    }
};

export default wordsReducer;