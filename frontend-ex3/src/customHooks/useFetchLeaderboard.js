import { useState, useEffect } from 'react';
import useDataApi from './useDataApi';

/**
 * Custom hook to fetch a list of
 */

const useFetchLeaderboard = () => {

    const [{ data, isLoading, isError, error },setConfig] = useDataApi({url:'/api/scores'}, null);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        if (data && Array.isArray(data) && !isLoading) {
            setScores(data);
        }
    }, [data, isLoading]);

    return {
        scores,
        loading: isLoading,
        error: isError,
        fetchLeaderboard: setConfig
    };
};

export default useFetchLeaderboard;