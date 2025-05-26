import React, { useState, useEffect } from "react";

/**
 * GameStopwatch component tracks elapsed time while the game is in 'playing' status.
 * It increments the timer every 10 milliseconds and calls the optional onTimeUpdate callback.
 *
 * @param {Object} props
 * @param {string} props.gameStatus - Current status of the game (e.g., 'playing', 'won').
 * @param {(time: number) => void} [props.onTimeUpdate] - Optional callback fired with the updated time in milliseconds.
 * @returns {JSX.Element} A formatted timer display (mm:ss.ms).
 * @constructor
 */
function GameStopwatch({ gameStatus, onTimeUpdate }) {
    const [time, setTime] = useState(0);

    // useEffect(() => {
    //     let interval = null;
    //
    //     // Start timer when game is playing, stop when won
    //     if (gameStatus === 'playing') {
    //         interval = setInterval(() => {
    //             setTime((prevTime) => prevTime + 10); // increment by 10ms
    //         }, 10);
    //     } else {
    //         clearInterval(interval);
    //     }
    //
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [gameStatus, onTimeUpdate]);

    /**
     * useEffect hook to manage the timer lifecycle
     */
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

    /**
     * Formats time in milliseconds to a string in mm:ss.ms format.
     *
     * @param {number} time - Time in milliseconds.
     * @returns {string} Formatted time string.
     */
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <>{formatTime(time)}</>
    );
}

export default GameStopwatch;