import GameState from "@/app/gamestate";

class GameLoop {
    private isRunning_: boolean = false;
    private animationFrameId: number | null = null;
    private gameState: GameState | null = null;
    private lastTimestamp: number = 0;
    private loopLevel: number = 1;

    constructor(level: number) {
        this.loopLevel = level;
    }

    start() {
        this.gameState = new GameState();
        this.gameState.setTimeComplexityLevel(this.loopLevel);
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
            ( this.gameState ? this.gameState?.getTimeFromComplexityLevel() : 1000))
        {
            console.log(`current timeframe: ${this.gameState?.getTimeFromComplexityLevel()}ms`);
            this.lastTimestamp = timestamp;
        }

        this.animationFrameId = requestAnimationFrame(this.loop);
    }

    setLevel(level: number) {
        if(this.gameState) {
            this.gameState.setTimeComplexityLevel(level);
        }
    }

    isRunning() {
        return this.isRunning_;
    }
}

export default GameLoop;