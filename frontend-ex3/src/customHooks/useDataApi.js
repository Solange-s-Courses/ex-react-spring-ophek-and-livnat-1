import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

/**
 * Reducer function to manage the state of a data-fetching request.
 *
 * @param {Object} state - Current state of the fetch operation.
 * @param {Object} action - Action object that describes the change.
 * @param {string} action.type - Type of the action ('FETCH_INIT', 'FETCH_SUCCESS', 'FETCH_FAILURE').
 * @param {*} [action.payload] - Payload of data, only used in 'FETCH_SUCCESS'.
 * @returns {(*&{isLoading: boolean, isError: boolean, data})|(*&{isLoading: boolean, isError: boolean})} Updated state after applying the action.
 */
const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

/**
 * Custom React hook for fetching data from an API using axios.
 *
 * Handles loading, error, and response states via a reducer.
 * It also supports dynamic URL updates for re-fetching data.
 *
 * @param {string} initialUrl - The initial URL to fetch data from.
 * @param {*} initialData - The initial data state before fetching.
 * @returns {[Object, Function]} A state object with `data`, `isLoading`, `isError`,
 *   and a function to update the fetch URL.
 */
const useDataApi = (initialUrl, initialData) => {

    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        /**
         * Fetches data from the API and updates state accordingly.
         * Handles cancellation to avoid state updates on unmounted components.
         *
         * @returns {Promise<void>}
         */
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });

            try {
                const result = await axios(url);

                if (!didCancel) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: 'FETCH_FAILURE' });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url]);

    return [state, setUrl];
};

export default useDataApi;