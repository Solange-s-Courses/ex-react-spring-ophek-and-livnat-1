import { useState, useEffect } from 'react';
import useDataApi from './useDataApi';

/**
 * Custom hook to fetch categories for the Hangman game from the backend API.
 * Uses the useDataApi hook to handle API requests and state management.
 *
 * @returns {Object} Object containing categories array, loading state, and error state
 */
const useFetchCategories = () => {
    // Use the data API hook to fetch from the backend endpoint
    const [{ data, isLoading, isError, error }] = useDataApi(
        {
            url: '/wordEntry/getCategories', // The endpoint from your WordEntryController
            method: 'GET'
        },
        []
    );

    const [categories, setCategories] = useState([]);

    // Process API response data once it's loaded
    useEffect(() => {
        if (data && Array.isArray(data) && !isLoading) {
            // Sort categories alphabetically
            const sortedCategories = [...data].sort();
            setCategories(sortedCategories);
        }
    }, [data, isLoading]);

    return {
        categories,
        loading: isLoading,
        error: isError ? error : null
    };
};

export default useFetchCategories;