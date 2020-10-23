const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const zombies = document.querySelectorAll('.zombie');
let timeLeft = document.querySelector('#timeleft')
let lastHole;
let timeUp = false;
let score = 0;
let curentTime = timeLeft.innerHTML


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
    curentTime = 30
    scoreBoard.textContent = 0;
    timeUp = false;
    scoreBoard.innerHTML = 0
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000) //show random zombies for 30 seconds
}
let interval = setInterval(() =>{
    curentTime --
    timeLeft.innerHTML = curentTime
     if(curentTime === 0){
         clearInterval(interval)
         alert(`you kill ${scoreBoard.innerHTML} zombies, boss tha!`)
     }
 }, 1000)

function smash(e){
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

zombies.forEach(zombie => zombie.addEventListener('click', smash))

