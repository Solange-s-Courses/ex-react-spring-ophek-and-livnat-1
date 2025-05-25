import React, { useState, useEffect } from "react";

function GameStopwatch({ gameStatus, onTimeUpdate }) {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval = null;

        // Start timer when game is playing, stop when won
        if (gameStatus === 'playing') {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 10; // increment by 10ms
                    // Call parent callback if provided
                    if (onTimeUpdate) {
                        onTimeUpdate(newTime);
                    }
                    return newTime;
                });
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [gameStatus, onTimeUpdate]);

    // Format time for display (mm:ss.ms)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-center mb-3">
            <div className="alert alert-secondary d-inline-block px-3 py-2">
                <span className="fw-bold">Time: {formatTime(time)}</span>
            </div>
        </div>
    );
}

export default GameStopwatch;