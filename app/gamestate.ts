import React from 'react';

class GameState
{
    private timeComplexityLevel: number = 1;
    private mathExpressionComplexityLevel: number = 0;
    private averageRoomLevel: number = 21;
    private baseTime: number = 2000;
    private finalTime: number = 400;
    private levels: number = 200;

    setTimeComplexityLevel(level: number) {
        this.timeComplexityLevel = level;
    }

    getTimeFromComplexityLevel() {
        const reciprocalFactor = (this.baseTime - this.finalTime) / (1 - 1 / this.levels);
        const smoothFactor = 1 /
            (
                this.timeComplexityLevel <= 170
            ?   Math.pow(this.timeComplexityLevel, 0.3)
            :   this.timeComplexityLevel
        );
        return this.finalTime + reciprocalFactor * (smoothFactor - 1 / this.levels);
    }

    getMathExpressionComplexityLevel() {
        return;
    }
}

export default GameState;