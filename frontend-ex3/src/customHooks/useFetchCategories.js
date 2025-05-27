import { useState, useEffect } from 'react';
import useDataApi from './useDataApi';

/**
 * Custom hook to fetch categories for the Hangman game from the backend API.
 * Uses the useDataApi hook to handle API requests and state management.
 *
 * @param {boolean} refreshTrigger - When this value changes, categories will be reFetched
 * @returns {{ categories: Array<string>, loading: boolean, error: any}}
 */
const useFetchCategories = (refreshTrigger = false) => {

    const [categories, setCategories] = useState([]);

    const [{ data, isLoading, isError, error }, fetchCategories] = useDataApi({url:''}, []);

    /**
     * Fetches the categories from the backend API when the hook is first mounted
     * or when the refreshTrigger changes.
     */
    useEffect(() => {
        fetchCategories({
            url: '/wordEntry/getCategories',
            method: 'GET'
        });
    }, [refreshTrigger]);

    /**
     * Processes the fetched data and stores the sorted category list in state.
     * Only runs when new data is available and loading has finished.
     */
    useEffect(() => {
        //if (data && Array.isArray(data) && !isLoading) {
        if (Array.isArray(data) && !isLoading) {
            // Sort categories alphabetically
            const sortedCategories = [...data].sort();
            setCategories(sortedCategories);
        }
    }, [data, isLoading]);

    return {
        categories,
        loading: isLoading,
        isError: isError,
        error: isError ? error : null
    };
};

export default useFetchCategories;