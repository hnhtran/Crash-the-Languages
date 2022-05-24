// console.log("linked")

// Grab the neccessary elements
let cardsTable = document.querySelectorAll(".cards");
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
  // bug here, when call this function everytime, its generate a new array to add on the previous one. resolved!
  if (cardsBack === null) {
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
  } else {
    cardsBack = [];
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
  }
};

// cardsFill will be called when Start button is pressed, and empty table will be filled with words
const cardsFill = () => {
  shuffledCards = shuffle(cards);
  // console.log(
  //   `${shuffledCards} First display cards when Start button pressed`
  // );
  for (let i = 0; i < shuffledCards.length; i++) {
    cardsTable[i].innerText = shuffledCards[i];
  }
  // everytime cardFill was called, cardsBackFill should be called also
  cardsBackFill(shuffledCards);
  // console.log(`${cardsBack} Back of the cards was called `);
  cardsSwap = cardsBack;
};

let count2 = 0;
let temp = [];
let tempId = [];
const cardClicked = (e) => {
  let cardId = e.target.id;
  // console.log(
  //   `${cardId} clicked, with the word ${cardsTable[cardId].innerText}`
  // ); // cannot do cardId.innerText, maybe not exist.. shoudl be cardsTable[id]?

  // console.log(`${cardsBack} Back of the cards was called `);
  // console.log(`${shuffledCards} First display cards when Start button pressed`);

  // logic here.
  // also, bug here. When 1 click, all of the card will be changed backwards, except that card
  // that text will be stored in temp
  // reset that text to cardsBack value
  // temp will be used for if statement (or isMatch())
  // what is isMatch?

  // initiate isMatch()
  // if (temp[0] === temp[1]) {
  //   cardsTable[tempId[0]].removeEventListener("click", cardClicked)
  //   cardsTable[tempId[1]].removeEventListener("click", cardClicked)
  //   temp = []
  //   tempId =[]
  // }

  // attention: cardsBack is an array with value already, not an element grab from html, so dont use cardsBack[id].innertext
  if (count2 < 2) {
    temp[count2] = cardsTable[cardId].innerText;
    tempId[count2] = cardId;
    console.log(tempId);
    console.log(temp);
    cardsTable[cardId].innerText = cardsSwap[cardId];
    cardsTable[cardId].style = `background-color: pink;`;
    // console.log(temp);

    for (let i = 0; i < cardsTable.length; i++) {
      if (i !== cardId) cardsTable[i].innerText = cardsSwap[i];
    }
    // reset cards at the back as cardsTable, except value of the card at cardId
    if (cardsSwap === shuffledCards) {
      cardsSwap = cardsBack;
    } else {
      cardsSwap = shuffledCards;
    }

    // console.log(cardsBack)
    cardsTable[cardId].removeEventListener("click", cardClicked);
    // console.log(cardsBack);
    count2++;
  } else {
    count2 = 0;
    cardsTable.innerText = shuffledCards;

    //reset the colors back to neutral
    for (let i = 0; i < cardsTable.length; i++) {
      cardsTable[i].style = `background-color: none;`;
    }
    //eventListener for every box in the table
    cardsTable.forEach((card) => {
      card.addEventListener("click", cardClicked);
    });
  }
};

// start button is pressed
start.addEventListener("click", cardsFill);

//eventListener for every box in the table
cardsTable.forEach((card) => {
  card.addEventListener("click", cardClicked);
});
