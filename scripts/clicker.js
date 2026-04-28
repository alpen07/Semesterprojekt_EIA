class ClickCounter {
    score = 0;

    constructor() {
        this.score = 0;
        this.asteroid = document.getElementById('asteroid');
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.asteroid.addEventListener('click', () => this.incrementScore());
    }

    incrementScore() {
        this.score++;
        this.scoreDisplay.textContent = this.score;
    }
}


const clickCounter = new ClickCounter();
