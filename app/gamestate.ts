import React from 'react';

class GameState
{
    private complexityLevel: number = 1;
    private baseTime: number = 2000;
    private finalTime: number = 400;
    private levels: number = 200;
    private mathOperator : string = "";
    private number : number = 0;
    private levelRounds : number = 3;
    private currentRound : number = 1;

    setComplexityLevel(level: number) {
        this.complexityLevel = level;
        // this.number = this.getNumber();
    }

    getTime() {
        const reciprocalFactor = (this.baseTime - this.finalTime) / (1 - 1 / this.levels);
        const smoothFactor = 1 /
            (
                this.complexityLevel <= 170
            ?   Math.pow(this.complexityLevel, 0.3)
            :   this.complexityLevel
        );
        return this.finalTime + reciprocalFactor * (smoothFactor - 1 / this.levels);
    }

    getMathExpression() {
        this.mathOperator = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        return this.mathOperator;
    }

    getNumber() {
        if(this.mathOperator === "*") {
            const min = 1;
            const max = 3
            const newNumber = Math.floor(min + Math.random() * (max - min));
            this.number = (this.number === newNumber) ? Math.floor(min + Math.random() * (max - min)) : newNumber;
            return newNumber;
        }

        const min = 1;
        const max = 50;
        const newNumber = Math.floor(min + Math.random() * (max - min));
        this.number = (this.number === newNumber) ? Math.floor(min + Math.random() * (max - min)) : newNumber;
        return newNumber;
    }

    getLevelRounds() {
        return this.levelRounds;
    }

    getCurrentRound() {
        return this.currentRound;
    }

    nextRound() {
        this.currentRound++;
    }
}

export default GameState;