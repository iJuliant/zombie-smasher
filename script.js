const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const zombies = document.querySelectorAll('.zombie');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(700, 1300);
    const hole = randomHole(holes); 
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //show random zombies for 15 seconds
}

function smash(e){
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

zombies.forEach(zombie => zombie.addEventListener('click', smash))

