import React from 'react';
import useFetchLeaderboard from '../../customHooks/useFetchLeaderboard';// For medal icons
import '../../App.css'

function LeaderboardPage() {
    const { scores, loading, error } = useFetchLeaderboard();

    if (loading) return <div className="text-center mt-5">Loading leaderboard...</div>;
    if (error) return <div className="text-center mt-5 text-danger">Error loading leaderboard.</div>;

    const topThree = scores.slice(0, 3);
    const rest = scores.slice(3);

    const medalIcons = ['bi-trophy-fill text-warning', 'bi-trophy-fill text-secondary', 'bi-trophy-fill text-bronze'];

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h2 className="fw-bold">🏆 Leaderboard</h2>
            </div>

            {/*/!* Top 3 Podium *!/*/}
            {/*<div className="row justify-content-center text-center mb-5">*/}
            {/*    {topThree.map((entry, index) => (*/}
            {/*        <div key={index} className="col-md-4 mb-3">*/}
            {/*            <div className="card shadow h-100 border-0">*/}
            {/*                <div className={`card-header bg-light`}>*/}
            {/*                    <i className={`bi ${medalIcons[index]} fs-1`}></i>*/}
            {/*                </div>*/}
            {/*                <div className="card-body">*/}
            {/*                    <h4 className="card-title">{entry.nickname}</h4>*/}
            {/*                    <p className="card-text fs-5">Score: {entry.score}</p>*/}
            {/*                    <span className="badge bg-dark">Rank #{index + 1}</span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            <div className="row justify-content-center text-center mb-5 align-items-end">
                {/* Second place - left */}
                <div className="col-md-4 d-flex flex-column justify-content-end pt-4">
                    {topThree[1] && (
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column justify-content-center">
                                <i className="bi bi-trophy-fill text-secondary fs-1 mb-2"></i>
                                <h5 className="mb-1">{topThree[1].nickname}</h5>
                                <small>Rank #2</small>
                            </div>
                        </div>
                    )}
                </div>

                {/* First place - center */}
                <div className="col-md-4 d-flex flex-column justify-content-end">
                    {topThree[0] && (
                        <div className="card shadow border-0 h-100 pt-5">
                            <div className="card-body d-flex flex-column justify-content-center">
                                <i className="bi bi-trophy-fill text-warning fs-1 mb-2"></i>
                                <h4 className="mb-1">{topThree[0].nickname}</h4>
                                <strong>Rank #1</strong>
                            </div>
                        </div>
                    )}
                </div>

                {/* Third place - right */}
                <div className="col-md-4 d-flex flex-column justify-content-end pt-4">
                    {topThree[2] && (
                        <div className="card shadow border-0 h-100">
                            <div className="card-body d-flex flex-column justify-content-center">
                                <i className="bi bi-trophy-fill fs-1 mb-2 text-bronze"></i>
                                <h6 className="mb-1">{topThree[2].nickname}</h6>
                                <small>Rank #3</small>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* The rest */}
            {rest.length > 0 && (
                <div className="card shadow mb-5">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Other Players</h5>
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-striped mb-0 text-center">
                            <thead className="table-light">
                            <tr>
                                <th>Rank</th>
                                <th>Nickname</th>
                                <th>Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rest.map((entry, index) => (
                                <tr key={index + 3}>
                                    <td>{index + 4}</td>
                                    <td>{entry.nickname}</td>
                                    <td>{entry.score}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LeaderboardPage;



// import React from 'react';
// import useFetchLeaderboard from '../../customHooks/useFetchLeaderboard';
//
//
// function LeaderboardPage (){
//
//     const { scores, loading, error } = useFetchLeaderboard();
//
//     if (loading) return <p>Loading leaderboard...</p>;
//     if (error) return <p>Error loading leaderboard.</p>;
//
//     return (
//         <div>
//             <h2>Top Scores</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Rank</th>
//                     <th>Nickname</th>
//                     <th>Score</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {scores.map((entry, index) => (
//                     <tr key={entry.nickname}>
//                         <td>{index + 1}</td>
//                         <td>{entry.nickname}</td>
//                         <td>{entry.score}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
//
// export default LeaderboardPage;