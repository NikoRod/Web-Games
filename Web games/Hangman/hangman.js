// VARIABLES 
const letters = "abcdefghijklmnopqrstuvwxyz"; //LETRAS EN USO

let lettersArray = Array.from(letters); //ARRAY DE LETRAS
let lettersContainer = document.querySelector(".letters");      

// GENERADOR DE LETRAS  
lettersArray.forEach(letter => {

  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);

  span.appendChild(theLetter);
  span.className = 'letter-box';

  lettersContainer.appendChild(span);
});

// PALABRAS Y CATEGORIAS
const words = {
  sports: ["baseball", "football", "basketball", "voleyball", "american football", "handball", "ice hockey", "archery"],
  movies: ["Rocky", "Avengers", "Parasite", "Interstellar", "Whiplash", "Top Gun", "Karate Kid", "IT"],
  people: ["Albert Einstein", "Lionel Messi", "Elon Musk", "Michael Jackson", "Elton John"],
  countries: ["Argentina", "United States", "Brasil", "Sweden", "Germany", "Japan", "Finland"]
}

// RANDOMIZADOR
let allKeys = Object.keys(words);

// NUMERO RANDOM POR EL LARGO DE LA PALABRA
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// CATEGORIA
let randomPropName = allKeys[randomPropNumber];

// PALABRAS DE LAS CATEGORIAS
let randomPropValue = words[randomPropName];

// NUMERO RANDOM DEPENDIENDO DE LA PALABRA
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// PALABRA ELEGIDA
let randomValue = randomPropValue[randomValueNumber];

// AGREGA LA CATEGORIA
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// LETRAS DE LA PALABRA A ADIVINAR
let lettersGuessContainer = document.querySelector(".letters-guess");

// PALABRA ELEGIDA DE STRING => ARRAY
let lettersAndSpace = Array.from(randomValue);


lettersAndSpace.forEach(letter => {

  let emptySpan = document.createElement("span");

  if (letter === ' ') {
    emptySpan.className = 'with-space';
  }

  lettersGuessContainer.appendChild(emptySpan);
});


let guessSpans = document.querySelectorAll(".letters-guess span");

// INTENTOS FALLIDOS
let wrongAttempts = 0;

// DIBUJO
let theDraw = document.querySelector(".hangman-draw");

// FUNCION DE LETRAS CLICKEADAS
document.addEventListener("click", (e) => {

  let theStatus = false;

  if (e.target.className === 'letter-box') {
    e.target.classList.add("clicked");

    // LETRA CLICKEADA
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // PALABRA A ADIVINAR
    let theChosenWord = Array.from(randomValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {

      // VERIFICACIÓN DE LETRA CORRECTA
      if (theClickedLetter == wordLetter) {
        theStatus = true;

        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
            console.log('Correct letter');
          }
        });

        if (wordIndex == words) {
            console.log("si");
        }

      }
    });


    // LETRAS INCORRECTAS, DIBUJO Y GAME OVER
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 7) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } 

  }
});


// WIN
function win() {

    // MENSAJE POPUP
    let divWin = document.createElement("div");
    let divTextWin = document.createTextNode('YOU WIN!');

    divWin.appendChild(divTextWin);

    divWin.className = 'popup';

    document.body.appendChild(divWin);
}

// GAME OVER
function endGame() {

    // MENSAJE POPUP
    let divLost = document.createElement("div");
    let divTextLost = document.createTextNode(`GAME OVER, THE WORD WAS "${randomValue}"`);

    divLost.appendChild(divTextLost);

    divLost.className = 'popup';

    document.body.appendChild(divLost);
}