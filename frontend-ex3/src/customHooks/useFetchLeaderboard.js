import { useState, useEffect } from 'react';
import useDataApi from './useDataApi';

/**
 * Custom hook to fetch leaderboard scores from the backend.
 *
 * This hook uses the useDataApi abstraction to make an API call to '/api/scores',
 * manages loading and error states, and extracts score data into a local state.
 *
 * @returns {{
 *   scores: Array<Object> | null,   // The list of top scores or null if not loaded yet
 *   loading: boolean,               // Whether the API request is in progress
 *   error: boolean,                 // Whether there was an error during fetching
 *   fetchLeaderboard: Function      // Function to manually trigger the fetch if needed
 * }}
 */
const useFetchLeaderboard = () => {

    const [{ data, isLoading, isError},setConfig] = useDataApi({url:'/api/scores'}, null);
    const [scores, setScores] = useState(null);

    /**
     * Updates the local `scores` state when valid leaderboard data is received
     * and the loading process has completed.
     */
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