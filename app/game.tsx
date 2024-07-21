"use client"

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import GameLoop from "@/app/gameloop";

const Game = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [gameLoop, setGameLoop] = useState<GameLoop | null>(null);
    const [level, setLevel] = useState(1);
    let currentNumber = 0;
    let currentMathOperator = "+";


    const toggleGame = () => {
        setIsRunning(prevState => {
            const toggledIsRunningState = !prevState;
            if (toggledIsRunningState) {
                setGameLoop(() => { const loop = new GameLoop(level); loop.start(); return loop; });
                gameLoop?.start();
            } else {
                setGameLoop(() => { gameLoop?.stop(); return null; });
            }
            return toggledIsRunningState;
        });
   }

    const handleLevelChange = (value: number) => {
        setLevel(prevState => {
            gameLoop?.setLevel(value);
            return value;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Badge className="text-3xl">
                <p className="math">{currentMathOperator}</p>
                <p className="number">{currentNumber}</p>
            </Badge>
            <div className="flex flex-row items-center justify-center w-full max-w-[400px]">
                <Badge className="min-w-[100px] flex flex-row items-center justify-center" variant="outline">
                    <p className="text-center">Level: {level}</p>
                </Badge>
                <Slider className="w-full p-[16px] ml-2"
                        value={[level]}
                        max={200}
                        min={1}
                        step={1}
                        onValueChange={(values: number[]) => handleLevelChange(values[0])}
                />
            </div>
            <Button onClick={toggleGame} className="flex text-2xl p-5 mb-4">
                <p>{isRunning ? "Stop Game" : "Start Game"}</p>
            </Button>
            {/*<Button onClick={testIncrementLevel} className="flex text-1xl p-5"><p>{isTestIncrementing ? "Stop Test Increment Level" : "Test Increment Level"}</p></Button>*/}
        </div>
    );
};

export default Game;