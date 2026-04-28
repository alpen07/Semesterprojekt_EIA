class ClickCounter {

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

    shortForm(){
        switch (true) {
            case this.score >= 1e3 : {
                return (this.score / 1e3).toFixed(1) + 'K';
            }
            case this.score >= 1e6 : {
                return (this.score / 1e6).toFixed(1) + 'M';
            }
        }
    }
}


const clickCounter = new ClickCounter();
