import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

/**
 * Reducer function to manage the state of a data-fetching request.
 *
 * @param {Object} state - Current state of the fetch operation.
 * @param {Object} action - Action object that describes the change.
 * @param {string} action.type - Type of the action ('FETCH_INIT', 'FETCH_SUCCESS', 'FETCH_FAILURE').
 * @param {*} [action.payload] - Payload of data, only used in 'FETCH_SUCCESS'.
 * @returns {Object} Updated state after applying the action.
 */
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: null,  // Clear previous error
                data: null    // Clear previous data
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: null,  // Ensure error is cleared on success
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload,
                data: null,   // Clear data on failure
            };
        case 'RESET':
            return {
                isLoading: false,
                isError: false,
                error: null,
                data: action.payload || null, // Allow custom initial data on reset
            };
        default:
            throw new Error();
    }
};

/**
 * Custom React hook for fetching data from an API using axios.
 *
 * Handles loading, error, and response states via a reducer.
 * Supports all HTTP methods (GET, POST, PUT, DELETE, etc.)
 *
 * @param {Object} initialConfig - The initial configuration for the API request.
 * @param {string} initialConfig.url - The URL to fetch data from.
 * @param {string} [initialConfig.method='GET'] - The HTTP method to use.
 * @param {Object} [initialConfig.data=null] - The data to send with the request (for POST, PUT, etc.).
 * @param {Object} [initialConfig.headers={}] - Headers to include with the request.
 * @param {*} initialData - The initial data state before fetching.
 * @returns {[Object, Function]} A state object with `data`, `isLoading`, `isError`, `error`,
 *   and a function to update the request configuration.
 */
const useDataApi = (initialConfig = { url: '', method: 'GET', data: null, headers: {} }, initialData = null) => {
    const [config, setConfig] = useState(initialConfig);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        error: null,
        data: initialData,
    });

    /**
     * Reset the state to initial values
     * @param {*} [resetData=null] - Optional data to set after reset
     */
    const reset = (resetData = null) => {
        dispatch({ type: 'RESET', payload: resetData });
    };

    useEffect(() => {
        let didCancel = false;

        /**
         * Executes the API request and updates state accordingly.
         * Handles cancellation to avoid state updates on unmounted components.
         *
         * @returns {Promise<void>}
         */
        const fetchData = async () => {
            // Only proceed if we have a URL
            if (!config.url) return;

            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios({
                    url: config.url,
                    method: config.method || 'GET',
                    data: config.data || null,
                    headers: config.headers || {},
                });

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({
                        type: 'FETCH_FAILURE',
                        payload: error.response ? error.response.data : error.message
                    });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [config]);

    return [state, setConfig, reset];
};

export default useDataApi;