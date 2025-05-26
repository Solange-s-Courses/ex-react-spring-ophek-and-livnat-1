import React from 'react';
import useFetchLeaderboard from '../../customHooks/useFetchLeaderboard';// For medal icons
import '../../App.css'

function LeaderboardPage() {
    const { scores, loading, error, fetchLeaderboard } = useFetchLeaderboard();

    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Leaderboard</h2>
                    {/*<h2 className="fw-bold">🏆 Leaderboard</h2>*/}
                </div>

                {loading || (!scores && !error) ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center">
                        <div className="alert alert-danger">
                            <p className="mb-2">Error loading leaderboard. Please try again.</p>
                            <button
                            className="btn btn-outline-danger"
                            onClick={() => fetchLeaderboard({ url: '/api/scores' })}>
                            Retry
                            </button>
                        </div>
                    </div>

                ) : (!loading && scores && scores.length === 0) ? (
                    <div className="text-center">
                        <div className="alert alert-info">
                            <h5>No players yet!</h5>
                            <p>Be the first to play and claim the top spot on the leaderboard!</p>
                        </div>
                    </div>
                ) : (
                    (() => {
                        const topThree = scores.slice(0, 3);
                        const rest = scores.slice(3);
                        return (
                            <>
                                {/* Top 3 Podium - Single responsive layout */}
                                <div className="row justify-content-center text-center mb-5">
                                    {topThree.map((entry, index) => {
                                        const isFirst = index === 0;
                                        const isSecond = index === 1;
                                        const isThird = index === 2;

                                        return (
                                            <div
                                                key={index}
                                                className={`col-12 col-md-3 mb-3 d-flex flex-column justify-content-end ${
                                                    isSecond ? 'order-md-1' :
                                                        isFirst ? 'order-md-2' :
                                                            'order-md-3'
                                                } ${isSecond || isThird ? 'pt-md-4' : ''}`}
                                            >
                                                <div
                                                    className="card shadow border-0"
                                                    style={{
                                                        height: isFirst ? '250px' : '200px'
                                                    }}
                                                >
                                                    <div className="card-body d-flex flex-column justify-content-center">
                                                        <i className={`bi bi-trophy-fill fs-1 mb-2 ${
                                                            isFirst ? 'text-warning' :
                                                                isSecond ? 'text-secondary' :
                                                                    'text-bronze' }`}>
                                                        </i>
                                                        <h5 className="mb-1">{entry.nickname}</h5>
                                                        <p className="mb-1 fw-bold">Score: {entry.score}</p>
                                                        <span className="badge bg-dark">Rank #{index + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
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
                            </>
                        );
                    })()
                )}
            </div>
        </div>
    );
    // if (loading) return <div className="text-center mt-5">Loading leaderboard...</div>;
    // if (error) return <div className="text-center mt-5 text-danger">Error loading leaderboard.</div>;
    //
    // // Fix #1: Check if no scores and show message
    // if (!scores || scores.length === 0) {
    //     return (
    //         <div className="min-vh-100 py-5 bg-info bg-opacity-25">
    //             <div className="text-center">
    //                 <h2 className="fw-bold mb-4">🏆 Leaderboard</h2>
    //                 <div className="alert alert-info mx-5">
    //                     <h5>No players yet!</h5>
    //                     <p>Be the first to play and claim the top spot on the leaderboard!</p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    //
    // const topThree = scores.slice(0, 3);
    // const rest = scores.slice(3);
    //
    // //const medalIcons = ['bi-trophy-fill text-warning', 'bi-trophy-fill text-secondary', 'bi-trophy-fill text-bronze'];
    //
    // // return (
    // //     <div className="container mt-5">
    // //         <div className="text-center mb-4">
    // //             <h2 className="fw-bold">🏆 Leaderboard</h2>
    // //         </div>
    // //
    // //         {/*/!* Top 3 Podium *!/*/}
    // //         {/*<div className="row justify-content-center text-center mb-5">*/}
    // //         {/*    {topThree.map((entry, index) => (*/}
    // //         {/*        <div key={index} className="col-md-4 mb-3">*/}
    // //         {/*            <div className="card shadow h-100 border-0">*/}
    // //         {/*                <div className={`card-header bg-light`}>*/}
    // //         {/*                    <i className={`bi ${medalIcons[index]} fs-1`}></i>*/}
    // //         {/*                </div>*/}
    // //         {/*                <div className="card-body">*/}
    // //         {/*                    <h4 className="card-title">{entry.nickname}</h4>*/}
    // //         {/*                    <p className="card-text fs-5">Score: {entry.score}</p>*/}
    // //         {/*                    <span className="badge bg-dark">Rank #{index + 1}</span>*/}
    // //         {/*                </div>*/}
    // //         {/*            </div>*/}
    // //         {/*        </div>*/}
    // //         {/*    ))}*/}
    // //         {/*</div>*/}
    // //
    // //         <div className="row justify-content-center text-center mb-5 align-items-end">
    // //             {/* Second place - left */}
    // //             <div className="col-md-4 d-flex flex-column justify-content-end pt-4">
    // //                 {topThree[1] && (
    // //                     <div className="card shadow border-0 h-100">
    // //                         <div className="card-body d-flex flex-column justify-content-center">
    // //                             <i className="bi bi-trophy-fill text-secondary fs-1 mb-2"></i>
    // //                             <h5 className="mb-1">{topThree[1].nickname}</h5>
    // //                             <small>Rank #2</small>
    // //                         </div>
    // //                     </div>
    // //                 )}
    // //             </div>
    // //
    // //             {/* First place - center */}
    // //             <div className="col-md-4 d-flex flex-column justify-content-end">
    // //                 {topThree[0] && (
    // //                     <div className="card shadow border-0 h-100 pt-5">
    // //                         <div className="card-body d-flex flex-column justify-content-center">
    // //                             <i className="bi bi-trophy-fill text-warning fs-1 mb-2"></i>
    // //                             <h4 className="mb-1">{topThree[0].nickname}</h4>
    // //                             <strong>Rank #1</strong>
    // //                         </div>
    // //                     </div>
    // //                 )}
    // //             </div>
    // //
    // //             {/* Third place - right */}
    // //             <div className="col-md-4 d-flex flex-column justify-content-end pt-4">
    // //                 {topThree[2] && (
    // //                     <div className="card shadow border-0 h-100">
    // //                         <div className="card-body d-flex flex-column justify-content-center">
    // //                             <i className="bi bi-trophy-fill fs-1 mb-2 text-bronze"></i>
    // //                             <h6 className="mb-1">{topThree[2].nickname}</h6>
    // //                             <small>Rank #3</small>
    // //                         </div>
    // //                     </div>
    // //                 )}
    // //             </div>
    // //         </div>
    // //
    // //
    // //         {/* The rest */}
    // //         {rest.length > 0 && (
    // //             <div className="card shadow mb-5">
    // //                 <div className="card-header bg-primary text-white">
    // //                     <h5 className="mb-0">Other Players</h5>
    // //                 </div>
    // //                 <div className="card-body p-0">
    // //                     <table className="table table-striped mb-0 text-center">
    // //                         <thead className="table-light">
    // //                         <tr>
    // //                             <th>Rank</th>
    // //                             <th>Nickname</th>
    // //                             <th>Score</th>
    // //                         </tr>
    // //                         </thead>
    // //                         <tbody>
    // //                         {rest.map((entry, index) => (
    // //                             <tr key={index + 3}>
    // //                                 <td>{index + 4}</td>
    // //                                 <td>{entry.nickname}</td>
    // //                                 <td>{entry.score}</td>
    // //                             </tr>
    // //                         ))}
    // //                         </tbody>
    // //                     </table>
    // //                 </div>
    // //             </div>
    // //         )}
    // //     </div>
    // // );
    // return (
    //     <div className="min-vh-100 py-5 bg-info bg-opacity-25">
    //         <div className="container">
    //             <div className="text-center mb-4">
    //                 <h2 className="fw-bold">🏆 Leaderboard</h2>
    //             </div>
    //
    //             {/* Fix #2: Responsive podium - proper order on all screen sizes */}
    //             <div className="row justify-content-center text-center mb-5">
    //                 {/* Desktop: 2nd, 1st, 3rd layout */}
    //                 <div className="d-none d-md-flex justify-content-center align-items-end">
    //                     {/* Second place - left */}
    //                     <div className="col-md-3 d-flex flex-column justify-content-end me-2">
    //                         {topThree[1] && (
    //                             <div className="card shadow border-0" style={{height: '200px'}}>
    //                                 <div className="card-body d-flex flex-column justify-content-center">
    //                                     <i className="bi bi-trophy-fill text-secondary fs-1 mb-2"></i>
    //                                     <h5 className="mb-1">{topThree[1].nickname}</h5>
    //                                     <p className="mb-1 fw-bold">Score: {topThree[1].score}</p>
    //                                     <small>Rank #2</small>
    //                                 </div>
    //                             </div>
    //                         )}
    //                     </div>
    //
    //                     {/* First place - center (taller) */}
    //                     <div className="col-md-3 d-flex flex-column justify-content-end mx-2">
    //                         {topThree[0] && (
    //                             <div className="card shadow border-0" style={{height: '250px'}}>
    //                                 <div className="card-body d-flex flex-column justify-content-center">
    //                                     <i className="bi bi-trophy-fill text-warning fs-1 mb-2"></i>
    //                                     <h4 className="mb-1">{topThree[0].nickname}</h4>
    //                                     <p className="mb-1 fw-bold">Score: {topThree[0].score}</p>
    //                                     <strong>Rank #1</strong>
    //                                 </div>
    //                             </div>
    //                         )}
    //                     </div>
    //
    //                     {/* Third place - right */}
    //                     <div className="col-md-3 d-flex flex-column justify-content-end ms-2">
    //                         {topThree[2] && (
    //                             <div className="card shadow border-0" style={{height: '180px'}}>
    //                                 <div className="card-body d-flex flex-column justify-content-center">
    //                                     <i className="bi bi-trophy-fill fs-1 mb-2 text-bronze"></i>
    //                                     <h6 className="mb-1">{topThree[2].nickname}</h6>
    //                                     <p className="mb-1 fw-bold">Score: {topThree[2].score}</p>
    //                                     <small>Rank #3</small>
    //                                 </div>
    //                             </div>
    //                         )}
    //                     </div>
    //                 </div>
    //
    //                 {/* Mobile: 1st, 2nd, 3rd vertical layout */}
    //                 <div className="d-md-none">
    //                     {topThree.map((entry, index) => (
    //                         <div key={index} className="col-12 mb-3">
    //                             <div className="card shadow border-0">
    //                                 <div className="card-body text-center">
    //                                     <i className={`bi bi-trophy-fill fs-1 mb-2 ${
    //                                         index === 0 ? 'text-warning' :
    //                                             index === 1 ? 'text-secondary' :
    //                                                 'text-bronze'
    //                                     }`}></i>
    //                                     <h5 className="mb-1">{entry.nickname}</h5>
    //                                     <p className="mb-1 fw-bold">Score: {entry.score}</p>
    //                                     <span className="badge bg-dark">Rank #{index + 1}</span>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //
    //             {/* The rest */}
    //             {rest.length > 0 && (
    //                 <div className="card shadow mb-5">
    //                     <div className="card-header bg-primary text-white">
    //                         <h5 className="mb-0">Other Players</h5>
    //                     </div>
    //                     <div className="card-body p-0">
    //                         <table className="table table-striped mb-0 text-center">
    //                             <thead className="table-light">
    //                             <tr>
    //                                 <th>Rank</th>
    //                                 <th>Nickname</th>
    //                                 <th>Score</th>
    //                             </tr>
    //                             </thead>
    //                             <tbody>
    //                             {rest.map((entry, index) => (
    //                                 <tr key={index + 3}>
    //                                     <td>{index + 4}</td>
    //                                     <td>{entry.nickname}</td>
    //                                     <td>{entry.score}</td>
    //                                 </tr>
    //                             ))}
    //                             </tbody>
    //                         </table>
    //                     </div>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );
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