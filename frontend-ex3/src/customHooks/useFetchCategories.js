import { useState, useEffect } from 'react';
import useDataApi from './useDataApi';

/**
 * Custom hook to fetch a list of
 */

const useFetchCategories = () => {

    const [{ data, isLoading, isError }] = useDataApi(
        'https://api.nobelprize.org/v1/country.json',
        { categories: [] }
    );

    const [categories, setCategories] = useState([]);

    // Process API response data once it's loaded
    useEffect(() => {
        if (data && data.categories && !isLoading) {
            // Transform data and sort alphabetically
            const categoriesData = Object.values(data.categories)
                .sort();
            setCategories(categoriesData);
        }
    }, [data, isLoading]);

    return {
        categories,
        loading: isLoading,
        error: isError
    };
};

export default useFetchCategories;