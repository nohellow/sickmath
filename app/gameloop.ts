class GameLoop {
    private lastTime: number = 0;
    private accumulatedTime: number = 0;
    private frameTime: number = 0;
    private running: boolean;
    private gameLevel: number = 0;
    private currentNumber: number = 0;
    private currentMathOperator: string;
    private readonly onNumberAndOperatorUpdate: (number: number, operator: string) => void;

    private mathOperators = ["+", "-", "*"];

    constructor(gameLevel: number = 0, onNumberAndOperatorUpdate: (number: number, operator: string) => void) {
        this.running = false;
        this.gameLevel = gameLevel;
        this.setFrameTimeFromLevel(gameLevel);
        this.setNumberFromLevel(gameLevel);
        this.currentMathOperator = "";
        this.onNumberAndOperatorUpdate = onNumberAndOperatorUpdate;
    }

    private loop = (timestamp: number) => {
        if (!this.running) {
            console.log("not running");
            return;
        }

        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;
        this.accumulatedTime += deltaTime / 1000;

        // console.log(`${this.frameTime} : ${this.accumulatedTime}`);
        if(this.accumulatedTime >= this.frameTime)
        {
            this.accumulatedTime = 0;
            this.currentMathOperator = this.mathOperators[Math.floor(Math.random() * this.mathOperators.length)];
            this.setNumberFromLevel(this.gameLevel);
            // console.log(`${this.currentNumber} ${this.currentMathOperator}`);
            this.onNumberAndOperatorUpdate(this.currentNumber, this.currentMathOperator);

        }
        requestAnimationFrame(this.loop);
    };

    start() {
        if (!this.running) {
            this.running = true;
            this.lastTime = performance.now();
            this.accumulatedTime = 0;
            requestAnimationFrame(this.loop);
        }
    }

    stop() {
        this.running = false;
    }

    setFrameTimeFromLevel(level: number) {
        this.gameLevel = level;
        this.frameTime = 2 * Math.pow(0.1, level / 100);
        console.log(`set frame time to ${this.frameTime}. Current level: ${level}`);
    }

    setNumberFromLevel(level: number) {
        this.gameLevel = level;
        let number;
        let min, max;
        if (this.currentMathOperator === "*") {
            min = 1;
            max = 5 + (level * 0.15);
        } else {
            min = 1;
            max = 9 + (level * 0.5 * 9.98);
        }
        number = Math.floor(min + Math.random() * (max - min));
        if (this.currentNumber === number) number = Math.floor(min + Math.random() * (max - min));
        this.currentNumber = number;
        // console.log(`set number to ${this.currentNumber}`);
    }
    
}

export default GameLoop;