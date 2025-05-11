import React from 'react';
import useFetchLeaderboard from '../../customHooks/useFetchLeaderboard';


function LeaderboardPage (){

    const { scores, loading, error } = useFetchLeaderboard();

    if (loading) return <p>Loading leaderboard...</p>;
    if (error) return <p>Error loading leaderboard.</p>;

    return (
        <div>
            <h2>Top Scores</h2>
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Nickname</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {scores.map((entry, index) => (
                    <tr key={entry.nickname}>
                        <td>{index + 1}</td>
                        <td>{entry.nickname}</td>
                        <td>{entry.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderboardPage;