//importo el archivo donde están contenidas las quotes y las imagenes.
import { quoteImg } from './scripts/quoteImg.js';
//importo los gifs para la pantalla final:
import { gif } from './scripts/gif.js';

import {Queue} from './scripts/queue.js';

//variable que guarda la Score
let score;
//variable que guarda la highScore
let highScore;
//img elegida para mostrar su quote. Tipo number
let imgElegida;


//instancio la Queue:
const queue = new Queue();


//variables de posicion de la imagen el array y las img en si
let num1;
let num2;
let img1;
let img2;

//Cronómetro
let progress;

//Defino los botones L y R llamando a los divs que contienen las imgs
let btnL = document.getElementById('imgL');
let btnR = document.getElementById('imgR');
let l; //variable que guarda la src de la img clickada Left
let r; //variable que guarda la src de la img clickada Right

//guardo el boton backToMenu
let btnBackToMenu = document.getElementById("backToMenuBtn");
//le añado un listener para que ejecute la funcion backToMenu
btnBackToMenu.addEventListener("click", backToMenu);

let btnStartGame = document.getElementById("startGame");
btnStartGame.addEventListener("click", startGame);


function startGame(){
    score = 0;
    highScore = 0;
    //activo las pantallas necesarias
    document.getElementById("index_container").style.display = "none";
    document.getElementById("game_container").style.display = "block";
    showImg();
    showQuote();
    showTimer();
}


//creo una funcion que me devuelva un numero Random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  

function showImg(){

    //obtengo dos num de img aleatorios que !=:
    do{
        num1 = getRandomInt(quoteImg.length);
        num2 = getRandomInt(quoteImg.length);
    }while(num1 === num2);

    img1 = quoteImg[num1].img;
    img2 = quoteImg[num2].img;

    
    //chekeo que ninguna esté en la queue, si es así genero una nueva
    while (queue.contains(img1) || queue.contains(img2)) {
        
        if (queue.contains(img1)) {
            do {
              num1 = getRandomInt(quoteImg.length);
            } while (num1 === num2);
            img1 = quoteImg[num1].img;
          }
      
          if (queue.contains(img2)) {
            do {
              num2 = getRandomInt(quoteImg.length);
            } while (num1 === num2);
            img2 = quoteImg[num2].img;
          }
    }

    //si la queue está full genero 2 huecos:
    if(queue.size() >= 20){
        queue.dequeue();
        queue.dequeue();
    }

    queue.enqueue(img1);
    queue.enqueue(img2);

    document.getElementById("imgL").setAttribute("src", quoteImg[num1].img);
    document.getElementById("imgR").setAttribute("src", quoteImg[num2].img);
    // console.log(num1);
    // console.log(num2);
    // console.log(queue.items); //para comprobar que elementos se están guardando
    cambiarScore(); //esto lo suyo es que esté en una funcion startGame()
    cambiarHighScore();
}


//función para obtener la quote de la imgL seleccionada:
function showQuote(){
    let array = [num1, num2]; //guardo la posicion de las img elegidas
    imgElegida = array[Math.round(Math.random())]; //ahora elijo una de las 2 quotes a lo random
    let quote = document.getElementById("quote").innerText = quoteImg[imgElegida].frase;
    return quote;
}


function showTimer(){
    let progressBar = document.querySelector(".circle");
    let valueContainer = document.querySelector(".time");

    let progressValue = 10;
    let progressEndValue = 0;
    let circulo = 0;
    let speed = 1500; //este es el intervalo en ms entre que se produce cada progreso en la barra con el progressValue--

    progress = setInterval(() => {
        progressValue--;
        circulo++;
        valueContainer.textContent = `${progressValue}`;
        progressBar.style.background = `conic-gradient(
            transparent ${circulo * 36}deg,
            green ${circulo * 36}deg
        )`;
        if (progressValue == progressEndValue) {
            clearInterval(progress); //esto detiene la ejecución del intervao. Es decir, para que el reloj no siga corriendo
            gameOver();
        }
    }, speed);
}


//añado un evento al hacer click.
btnL.addEventListener('click', clickL);
btnR.addEventListener('click', clickR);

//estas son las funciones que se ejecutaran cuando el btnX oiga click:
function clickL(){
    console.log('L');
    l = btnL.getAttribute("src");
    guessL();
}
 
function clickR(){
    console.log('R');
    r = btnR.getAttribute("src");
    guessR();
}

//funciones que comprueban si ha acertado o no:
function guessL(){
    if(l === quoteImg[imgElegida].img){
        score++;
        cambiarScore();
        showImg();
        showQuote();
        clearInterval(progress); //limpio el cronómetro
        showTimer(); //reinicio el cronómetro
    }else{
        gameOver();
    }
}

function guessR(){
    if(r === quoteImg[imgElegida].img){
        score++;
        cambiarScore();
        showImg();
        showQuote();
        clearInterval(progress);
        showTimer();
    }else{
        gameOver();
    }
}


//función: cuando falla se termina la partida:
function gameOver(){
    if(score > highScore){
        highScore = score;
    }
    cambiarScore();
    cambiarHighScore();
    document.getElementById("game_container").style.display = "none";
    document.getElementById("gameover_container").style.display = "block";
    cambiarHighScore();
    localStorage.setItem('highScore', highScore);
    changeGif();
    document.getElementById("finalScore").innerText = score;
    score = 0;
    cambiarScore();
    clearInterval(progress); //se detiene la ejecución del showTimer. Para que cuando le de a playAgain surja un nuevo cronómetro
}


//funcion que cambia el score
function cambiarScore(){
    let puntos = document.getElementById("score").innerText = score;
    // return puntos;
}

//funcion que cambia el highscore:
function cambiarHighScore(){
    let maxPuntos = document.getElementById("highScore").innerText = localStorage.getItem('highScore');
    // return maxPuntos;
}


let numGif; //es un numero aleatorio correspondiente a la posicion de la lista gifs
let gifRandom; //guarda el gif a mostrar
function changeGif(){
    numGif = getRandomInt(gif.length);
    gifRandom = document.getElementById("gif").setAttribute("src", gif[numGif]);
    return gifRandom;
}


function backToMenu(){
    document.getElementById("gameover_container").style.display = "none";
    document.getElementById("index_container").style.display = "block";
}

//guardo el boton playAgain
let btnPlayAgain = document.getElementById("playAgainBtn");
//le añado un listener para que ejecute la funcion playAgain
btnPlayAgain.addEventListener("click", playAgain);


//Esto permite continuar la partida, no actualizando pues el highScore pero si el Score
function playAgain(){
    document.getElementById("gameover_container").style.display = "none";
    document.getElementById("game_container").style.display = "block";
    score = 0; 
    showImg();
    showQuote();
    showTimer();
}


//esto si tuviera muchos botones:
// function listenerButton(){
//     //obtenemos un array almacenando los botones que encuentre con la clase "button"
//     const buttons = document.querySelectorAll('.button');
//     //recorremos el array añadiendo el listener y le dice que debe hacer cuando oiga click
//     buttons.forEach(button => {
//         button.addEventListener('click', e => {
//             console.log(e.target.id)
//         })
//     })
// }
// listenerButton();
