const squares = document.querySelectorAll('.grid div');
const resultDisplay = document.querySelector('#result');
let width = 15;
let currentShooterIndex = 202;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;

// Le nombre d'aliens, tu peux le créer avec une fonction au lieu de le faire à la main DUH !
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

// dessiner les aliens
alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'));

// dessiner le tireur
squares[currentShooterIndex].classList.add('shooter');

// move le tireur
// REMPLACE PAR UN IF ELSE INDEED, meme ternary ope foncitonne ...
// fair eun custom event pour aller plus vite que les manips de base
function moveShooter(e) {
    console.log(currentShooterIndex);
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.keyCode){
        case 37:
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1;
            break;
        case 39:
            if(currentShooterIndex % width < width - 1) currentShooterIndex +=1;
            break;
    }
    squares[currentShooterIndex].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);


function moveInvaders(){
    // the fuck lol 100 % 50 = 0 ???
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1;
    
    if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
        direction = width;
    } else if (direction === width){
        if(leftEdge) direction = 1;
        else direction = -1;
    }
    for(let i = 0; i <= alienInvaders.length - 1; i++) {
        squares[alienInvaders[i]].classList.remove('invader');
    }
    for(let i = 0; i <= alienInvaders.length - 1; i++) {
        alienInvaders[i] += direction;
    }
    for(let i = 0; i <= alienInvaders.length - 1; i++) {
        if(!alienInvadersTakenDown.includes(i)){
            squares[alienInvaders[i]].classList.add('invader');
        }
    }


    // game over
    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){
        resultDisplay.textContent = "Game Over";
        squares[currentShooterIndex].classList.add('boom');
        clearInterval(invaderId);
    }

    for(let i = 0; i <+ alienInvaders.length -1; i++){
        if(alienInvaders[i] > (squares.length - (width-1))) {
            resultDisplay.textContent = 'Game Over';
            clearInterval(invaderId)
        }
    }

    // Decide a win
    if(alienInvadersTakenDown.length === alienInvaders.length) {
        resultDisplay.textContent = 'You Win'
        clearInterval(invaderId);
    }

}
invaderId = setInterval(moveInvaders, 500);

function shoot(e){      
    // console.log("hello");
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser(){
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if(squares[currentLaserIndex].classList.contains('invader')){
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.remove('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
            clearInterval(laserId);
            
            const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
            alienInvadersTakenDown.push(alienTakenDown);
            result++;
            resultDisplay.textContent = result;
        }


        
        if(currentLaserIndex < width){
            clearInterval(laserId)
            setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100);
        }
    }
    // chez elle ça marche pas ça ? Remplacé par un switch case wtf ?
    // document.addEventListener('keyup', e => {
     
    //     if(e.keycode === 32) {
    //         laserId = setInterval(moveLaser, 100);
    //     }
    // })

    switch(e.keyCode){
        case 32 :
        laseId = setInterval(moveLaser, 100)
        break;
    }

}

document.addEventListener('keyup', shoot);