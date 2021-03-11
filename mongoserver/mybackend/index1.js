class AudioController {
    constructor() {
        this.bgMusic = new Audio('Audio/bornBG.mp3');
        this.flipSound = new Audio('/Audio/flip.wav');
        this.matchSound = new Audio('Audio/match.wav');
        this.victorySound = new Audio('Audio/victory.wav');
        this.gameOverSound = new Audio('Audio/gameOver.wav');
        this.svikaSound = new Audio('Audio/Svika.mp3'); 
        this.rickiGalSound = new Audio('Audio/RickiGal.mp3'); 
        this.daniSandersonSound = new Audio('Audio/DaniSanderson.mp3'); 
        this.arikAiynshteinSound = new Audio('Audio/ArikAiynshtein.mp3'); 
        this.gidiGovSound = new Audio('Audio/GidiGov.mp3'); 
        this.igalBashanSound = new Audio('Audio/IgalBashan.mp3'); 
        this.yehiditRavitzSound = new Audio('Audio/YehiditRavitz.mp3'); 
        this.yehoramGaonSound = new Audio('Audio/YehoramGaon.mp3');
        this.bgMusic.volume = 0.05;
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
    victory() {
        this.stopMusic();
        this.victorySound.play();
    }
    ListenSvika(){
        this.svikaSound.play();
    }
    ListenRicki(){
        this.rickiGalSound.play();
    }
    ListenDani(){
        this.daniSandersonSound.play();
    }
    ListenArik(){
        this.arikAiynshteinSound.play();
    }
    ListenGidi(){
        this.gidiGovSound.play();
    }
    ListenIgal(){
        this.igalBashanSound.play();
    }
    ListenYehidit(){
        this.yehiditRavitzSound.play();
    }
    ListenYehoram(){
        this.yehoramGaonSound.play();
    }
    StopAllSingers(){
        this.svikaSound.pause();
        this.svikaSound.currentTime = 0;
        this.rickiGalSound.pause();
        this.rickiGalSound.currentTime = 0;
        this.daniSandersonSound.pause();
        this.daniSandersonSound.currentTime = 0;
        this.arikAiynshteinSound.pause();
        this.arikAiynshteinSound.currentTime = 0;
        this.gidiGovSound.pause();
        this.gidiGovSound.currentTime = 0;
        this.igalBashanSound.pause();
        this.igalBashanSound.currentTime = 0;
        this.yehiditRavitzSound.pause();
        this.yehiditRavitzSound.currentTime = 0;
        this.yehoramGaonSound.pause();
        this.yehoramGaonSound.currentTime = 0;
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

class MusicMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');
            if(card.getElementsByClassName('card-value')[0].alt == "Gidi" ){
                this.audioController.ListenGidi();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "Arik" ){
                this.audioController.ListenArik();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "Svika" ){
                this.audioController.ListenSvika();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "dani" ){
                this.audioController.ListenDani();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "Igal" ){
                this.audioController.ListenIgal();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "Yehidit" ){
                this.audioController.ListenYehidit();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "yehoram" ){
                this.audioController.ListenYehoram();
            }
            if(card.getElementsByClassName('card-value')[0].alt == "Ricki" ){
                this.audioController.ListenRicki();
            }

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
            }
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMismatch(card, this.cardToCheck);
            this.audioController.StopAllSingers();

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory();
    }
    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].id;
    }
    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MusicMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}