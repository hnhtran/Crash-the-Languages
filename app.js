// console.log("linked")

// Grab the neccessary elements
const cardsTable = document.querySelectorAll(".cards");
// console.log(cardsTable[0].innerText);
const start = document.getElementById("shuffle");

//create an array contains values of front page
const cardE = ["AWESOME", "BEAUTIFUL", "HAPPPY", "SUCCESS"];
const cardV = ["TUYỆT VỜI", "XINH ĐẸP", "HẠNH PHÚC", "THÀNH CÔNG"];
// const cards = ['AWESOME', 'BEAUTIFUL', 'HAPPPY', 'SUCCESS', 'TUYỆT VỜI', 'XINH ĐẸP', 'HẠNH PHÚC', 'THÀNH CÔNG']
const cards = cardE.concat(cardV);
console.log(`${cards} Intial cards `);

// new elements
let shuffledCards = [];
const shuffle = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

// Generate meaning at the back of the cards
let cardsBack = [];
const cardsBackFill = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < cardE.length; j++) {
      if (arr[i] === cardE[j]) {
        cardsBack.push(cardV[j]);
      }
      if (arr[i] === cardV[j]) {
        cardsBack.push(cardE[j]);
      }
    }
  }
};

// cardsFill will be called when Start button is pressed, and empty table will be filled with words
const cardsFill = () => {
  shuffledCards = shuffle(cards);
  console.log(
    `${shuffledCards} First display cards when Start button pressed`
  );
  for (let i = 0; i < shuffledCards.length; i++) {
    cardsTable[i].innerText = shuffledCards[i];
  }
  // everytime cardFill was called, cardsBackFill should be called also
  cardsBackFill(shuffledCards);
  console.log(`${cardsBack} Back of the cards was called `);
};

// start button is pressed
start.addEventListener("click", cardsFill);
console.log(
  `${shuffledCards} First display cards when Start button pressed`
);
console.log(`${cardsBack} Back of the cards was called `);

// eventListener for every box in the table
cardsTable.forEach((card) => {
    card.addEventListener("click", cardClicked)
})

function cardClicked() {
    console.log(`card click`)
}


// const cardClicked = (e) => {
//     let id = e.target.id
//     cardsTable[id].innerText = 
// }