"use client"

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import GameLoop from "@/app/gameloop";

const Game = () => {

    const [isGameRunning, setIsGameRunning] = useState(false);
    const [gameLoop, setGameLoop] = useState<GameLoop | null>(null);
    const [level, setLevel] = useState(1);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [currentMathOperator, setCurrentMathOperator] = useState("");
    const [isWaitingForUserInput, setIsWaitingForUserInput] = useState(false);

    const toggleGame = () => {
        setIsGameRunning(prevState => {
            const toggledIsRunningState = !prevState;
            if (toggledIsRunningState) {
                setGameLoop(() => { const loop = new GameLoop(level, handleNumberAndOperatorUpdate, handleGameEnd); loop.start(); return loop; });
                setIsWaitingForUserInput(false);
                gameLoop?.start();
            } else {
                setGameLoop(() => { gameLoop?.stop(); return null; });
            }
            return toggledIsRunningState;
        });
   }

    const handleGameEnd = () => {
        setIsGameRunning(false);
        setIsWaitingForUserInput(true);
    };

    const handleNumberAndOperatorUpdate = (number: number, operator: string) => {
        setCurrentNumber(number);
        setCurrentMathOperator(operator);
    };

    const handleLevelChange = (value: number) => {
        setLevel(prevState => {
            gameLoop?.setLevel(value);
            return value;
        });
    };

    const decreaseLevel = () => {
        setLevel(prevState => {
            if ( prevState > 1)
            {
                const newState = prevState - 1;
                gameLoop?.setLevel(newState);
                return newState;
            }
            return prevState;
        });
    }

    const increaseLevel = () => {
        setLevel(prevState => {
            const newState = prevState + 1;
            gameLoop?.setLevel(newState);
            return newState;
        });
    }
    return (
        <div className="flex flex-col items-center justify-center w-full">
            {( isGameRunning ?
                <>
                    <Badge className="mb-2">
                        <p className="currentRound">{gameLoop.getCurrentRound()}</p>/
                        <p className="totalRounds">{gameLoop.getTotalRounds()}</p>
                    </Badge>
                    <Badge className="text-3xl">
                        <p className="math">{gameLoop?.getCurrentTask().split(" ")[0]}</p>
                        <p className="number">{gameLoop?.getCurrentTask().split(" ")[1]}</p>
                    </Badge>
                </>
            : null)}
            {(      isWaitingForUserInput
                ?   <>
                    <div className="flex justify-start items-center">
                        <Label htmlFor="answer" className="text-2xl mr-2">Answer</Label>
                        <Input type="number" id="answer" className="no-focus paragraph-regular max-w-[300px] light-border-2" autoFocus={true}/>
                    </div>
                    </>
                :   null)}
            <div className="flex flex-row items-center justify-center w-full max-w-[400px]">
                <span onClick={decreaseLevel} className="block mr-2 text-4xl font-bold cursor-pointer">-</span>
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
                <span onClick={increaseLevel} className="block mr-2 text-3xl font-bold cursor-pointer">+</span>
            </div>
            <Button onClick={toggleGame} className="flex text-2xl p-5 mb-4">
                <p>{isGameRunning ? "Stop Game" : "Start Game"}</p>
            </Button>
            {/*<Button onClick={testIncrementLevel} className="flex text-1xl p-5"><p>{isTestIncrementing ? "Stop Test Increment Level" : "Test Increment Level"}</p></Button>*/}
        </div>
    );
};

export default Game;