"use client"

import React, { useState, useEffect } from 'react';

const Game = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [pairs, setPairs] = useState<string[]>([]);
    const operations = ['+', '-', '*'];
    const [counter, setCounter] = useState(0); // Use state for counter
    const maxOperations = 3; // Maximum number of operations
    const [total, setTotal] = useState(0); // Use state for total

    useEffect(() => {
        let interval: number;
        if (gameStarted && counter < maxOperations) {
            interval = setInterval(() => {
                const operation = operations[Math.floor(Math.random() * operations.length)];
                const number = Math.floor(Math.random() * 10) + 1;
                // Replace the last pair instead of adding
                if( operation == '-') { setTotal((prevTotal) => prevTotal - number); }
                if( operation == '+') { setTotal((prevTotal) => prevTotal + number); }
                if( operation == '*') { setTotal((prevTotal) => prevTotal * number); }
                setPairs((prevPairs) => prevPairs.length === 0 ? [`${number}`] : [`${operation}${number}`]);
                setCounter((prevCounter) => prevCounter + 1); // Update counter state
                console.log(`setting pair: ${counter}/${maxOperations}`)
            }, 1000);

        } else if (counter === maxOperations) {
            // Calculate result after the last operation
            setPairs(["", `Result: ${total}`]);
        }

        return () => clearInterval(interval);
    }, [gameStarted, pairs]);

    const startGame = () => {
        setGameStarted(true);
        setPairs([]);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {!gameStarted && (
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={startGame}>
                    Start
                </button>
            )}
            <div>
                {pairs.map((pair, index) => (
                    <div key={index}>{pair}</div>
                ))}
            </div>
        </div>
    );
};

export default Game;