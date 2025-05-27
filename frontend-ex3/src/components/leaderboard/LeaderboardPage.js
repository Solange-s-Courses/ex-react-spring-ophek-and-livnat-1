import React from 'react';
import useFetchLeaderboard from '../../customHooks/useFetchLeaderboard';
import '../../App.css'

function LeaderboardPage() {

    const { scores, loading, error, fetchLeaderboard } = useFetchLeaderboard();

    return (
        <div className="min-vh-100 py-5 bg-info bg-opacity-25">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Leaderboard</h2>
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
                        <div className="alert alert-info bg-light border-info d-flex align-items-center">
                            <i className="bi bi-info-circle me-3 fs-4"></i>
                            <p className="mb-0">
                                No players yet! Be the first to play and claim the top spot on the leaderboard!
                            </p>
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

                                {/* The rest of the list */}
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
}

export default LeaderboardPage;
