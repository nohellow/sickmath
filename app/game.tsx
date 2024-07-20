"use client"

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GameLoop from "./gameloop"

const Game = () => {
    const [level, setLevel] = useState(0);
    let gameLoop : GameLoop;
    const [isRunning, setIsRunning] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [currentMathOperator, setCurrentMathOperator] = useState("");
    const [isTestIncrementing, setIsTestIncrementing] = useState(false);

    const startGameLoop = () => {
        gameLoop = new GameLoop(level, handleNumberAndOperatorUpdate);
        gameLoop.start();
        setIsRunning(true);
        console.log("starting game loop");
    };

    const stopGameLoop = () => {
        gameLoop?.stop();
        setIsRunning(false);
        handleLevelChange(0);
        console.log("stopping game loop");
    }

    const toggleGame = async () => {
        if (isRunning) {
            console.log("stopping game loop");
            stopGameLoop();
        } else {
            console.log("starting game loop");
            startGameLoop();
        }
    };

    const handleNumberAndOperatorUpdate = (number: number, operator: string) => {
        setCurrentNumber(number);
        setCurrentMathOperator(operator);
    };

    const handleLevelChange = (value: number) => {
        if (gameLoop) {
            setLevel(value);
            console.log(`setting level to ${value}`);
            gameLoop.setFrameTimeFromLevel(value);
        }
        console.log("NO GAME LOOP")
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (isTestIncrementing) {
            startGameLoop();
            let currentLevel : number = level;

            const incrementLevel = () => {
                if (!isTestIncrementing) {
                    console.log(`Test is not incrementing`);
                    return;
                }

                console.log(`incrementing level to ${currentLevel + 1}`);
                currentLevel = currentLevel + 1;
                handleLevelChange(currentLevel);

                if (currentLevel < 100) {
                    timeoutId = setTimeout(incrementLevel, 200);
                }
            };

            incrementLevel();
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                stopGameLoop();
            }
        };
    }, [isTestIncrementing]);

    const testIncrementLevel = () => {
        setIsTestIncrementing(!isTestIncrementing);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {isRunning ? <Badge className="text-3xl"><p className="math">{currentMathOperator}</p><p className="number">{currentNumber}</p></Badge> : null}
            <div className="flex flex-row items-center justify-center w-full max-w-[400px]">
                <Badge className="min-w-[100px] flex flex-row items-center justify-center" variant="outline"><p className="text-center">Level: {level}</p></Badge>
                <Slider className="w-full p-[16px] ml-2" value={[level]} max={100} step={1} onValueChange={(values: number[]) => handleLevelChange(values[0])} />
            </div>
            <Button onClick={toggleGame} className="flex text-2xl p-5 mb-4"><p>{isRunning ? "Stop Game" : "Start Game"}</p></Button>
            <Button onClick={testIncrementLevel} className="flex text-1xl p-5"><p>{isTestIncrementing ? "Stop Test Increment Level" : "Test Increment Level"}</p></Button>
        </div>
    );
};

export default Game;