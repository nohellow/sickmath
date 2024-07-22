import GameState from "@/app/gamestate";
import React from "react";

class GameLoop {
    private isRunning_: boolean = false;
    private animationFrameId: number | null = null;
    private gameState: GameState | null = null;
    private lastTimestamp: number = 0;
    private loopLevel: number = 1;
    private currentMathOperator = "";
    private currentNumber = 1;
    private readonly onNumberAndOperatorUpdate: (number: number, operator: string) => void;
    private readonly onGameEnd: () => void;

    constructor(
                    level: number
                ,   onNumberAndOperatorUpdate: (number: number, operator: string) => void
                ,   onGameEnd: () => void

    ) {
        this.loopLevel = level;
        this.onNumberAndOperatorUpdate = onNumberAndOperatorUpdate;
        this.onGameEnd = onGameEnd;
    }

    start() {
        this.gameState = new GameState();
        this.gameState.setComplexityLevel(this.loopLevel);
        this.currentNumber = this.gameState.getNumber();

        this.lastTimestamp = performance.now();
        this.isRunning_ = true;
        console.log(`GameLoop started ${this.isRunning_}`);
        requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning_ = false;
        console.log(`GameLoop stopped ${this.isRunning_}`);
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    private loop = (timestamp: number) => {
        if (!this.isRunning_) return;

        if (timestamp - this.lastTimestamp >=
            ( this.gameState ? this.gameState?.getTime() : 1000))
        {
            if(this.gameState.getCurrentRound() === this.gameState.getLevelRounds()) {
                this.stop();
                this.onGameEnd();
                return;
            }

            this.currentMathOperator = this.gameState.getMathExpression()
            this.currentNumber = this.gameState.getNumber();
            console.log(`number: ${this.currentNumber}. operator: ${this.currentMathOperator}`);
            this.onNumberAndOperatorUpdate(this.currentNumber, this.currentMathOperator);

            console.log(`current timeframe: ${this.gameState?.getTime()}ms`);
            this.lastTimestamp = timestamp;

            this.gameState.nextRound();
        }

        this.animationFrameId = requestAnimationFrame(this.loop);
    }

    setLevel(level: number) {
        if(this.gameState) {
            this.gameState.setComplexityLevel(level);
        }
    }

    getCurrentTask() {
        return `${this.currentMathOperator} ${this.currentNumber}`;
    }

    isRunning() {
        return this.isRunning_;
    }

    getCurrentRound() {
        return this.gameState?.getCurrentRound();
    }

    getTotalRounds() {
        return this.gameState?.getLevelRounds();
    }
}

export default GameLoop;