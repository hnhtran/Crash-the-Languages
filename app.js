// console.log("linked")
// Prob: set the board box unclickable, restart function

// Grab the neccessary elements
let cardsTable = document.querySelectorAll(".cards");
let home = document.querySelectorAll(".home");
let board = document.getElementById("board");
// console.log(cardsTable[0].innerText);
const start = document.getElementById("shuffle");

//create an array contains values of front page
const cardE = ["AWESOME", "BEAUTIFUL", "HAPPPY", "SUCCESS"];
const cardV = ["TUYỆT VỜI", "XINH ĐẸP", "HẠNH PHÚC", "THÀNH CÔNG"];
// const cards = ['AWESOME', 'BEAUTIFUL', 'HAPPPY', 'SUCCESS', 'TUYỆT VỜI', 'XINH ĐẸP', 'HẠNH PHÚC', 'THÀNH CÔNG']
let cards = cardE.concat(cardV);
// console.log(`${cards} Intial cards `);

// new elements
let shuffledCards = [];
const shuffle = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

// Generate meaning at the back of the cards
let cardsBack = [];
function cardsBackFill(arr) {
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
function cardsFill() {
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

// restart here, reset table, reset board result
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
let countMatch = 0;
let tempIdArr = [];
function restart() {
  countMatch = 0;
  tempIdArr=[]
  // if (row1.children.length !== 0) {
  //   cardsFill()
  //   console.log(row1.children.length)
  // } else {
  //   for (let i = 0; i < row1.children.length; i++) {
  //     row1.append(cardsTable[i])
  //     row2.append(cardsTable[i + 4])
  //   }
  //   cardsFill()
  // }
  //reset the colors back to neutral
  for (let i = 0; i < cardsTable.length; i++) {
    // cardsTable[i].style = `background-color: none;`;
    home[i].append(cardsTable[i]);
  }
// set any unexpected beckground color back to neutral
  for (let i = 0; i < cardsTable.length; i++) {
    home[i].style = `background-color: none;`;
  }
  //remove td from table 2?
  for (let i = 0; i < 4; i++) {
    board.children[0].children[i].children.remove
  }

  cardsFill();
  cardClickListen()
};

let temp = [];
let tempId = [];
function match(temp, tempId) {
  if (temp[0] === temp[1]) {

    board.children[0].children[countMatch].innerHTML = `<td></td> <td></td>`;

    let td1 = board.children[0].children[countMatch].children[0];
    let td2 = board.children[0].children[countMatch].children[1];

    td1.append(cardsTable[tempId[0]]);
    td2.append(cardsTable[tempId[1]]);
    tempIdArr.push(tempId[0]);
    tempIdArr.push(tempId[1]);

    home[tempId[0]].removeEventListener("click", cardClicked);
    home[tempId[1]].removeEventListener("click", cardClicked);
    countMatch++;
  }
};

let count2 = 0;
function cardClicked(e) {
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
  // match(temp, tempId)
  // attention: cardsBack is an array with value already, not an element grab from html, so dont use cardsBack[id].innertext
  if (count2 < 2) {
    // cardsTable[cardId].style = `background-color: pink;`;

    home[cardId].style = `background-color: pink;`;
    temp[count2] = cardsTable[cardId].innerText;
    tempId[count2] = cardId;
    // console.log(tempId);
    // console.log(temp);
    cardsTable[cardId].innerText = cardsSwap[cardId];

    // console.log(temp);

    for (let i = 0; i < cardsTable.length; i++) {
      if (i !== cardId) {cardsTable[i].innerText = cardsSwap[i]};
    }
    // reset cards at the back as cardsTable, except value of the card at cardId
    if (cardsSwap === shuffledCards) {
      cardsSwap = cardsBack;
    } else {
      cardsSwap = shuffledCards;
    }

    // home[cardId].removeEventListener("click", cardClicked);
    count2++;
  } else {
    match(temp, tempId);
    count2 = 0;
    cardsTable.innerText = shuffledCards;
    temp = [];
    tempId = [];

    //reset the colors back to neutral
    for (let i = 0; i < cardsTable.length; i++) {
      home[i].style = `background-color: none;`;
    }
  }
};



//eventListener for every box in the table
function cardClickListen() {
  if (countMatch < 4) {
    home.forEach((card) => {
      // if cardId === tempIdArray, remove event listener, except 0s
      // console.log(tempIdArr.length)
      if (tempIdArr.length === 0) {
        card.addEventListener("click", cardClicked);
      } 
    });
  }
}

restart();
// start button is pressed
start.addEventListener("click", restart);
cardClickListen()

