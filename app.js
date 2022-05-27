// console.log("linked")

//=============future development==========//
// remember class visual hidden (maybe very useful)
// when user finish the game, some animation will pop up or word flying. I am still interested in word clouds
// adding difficulties like timing, score display, max clickable timer, etc.
// bootstrap text responsive when changing table or td or div dimension, and make text inside table align center middle

//=============current development==========//
// data array hold cards. board array contains result
// Grab the neccessary elements
let cardsTable = document.querySelectorAll(".cards");
let home = document.querySelectorAll(".home");
let board = document.getElementById("board");
let data = document.getElementById("data");
let row1 = document.getElementById("row1");
let row2 = document.getElementById("row2");
let msg = document.getElementById("msg");
const start = document.getElementById("shuffle");

//create an array contains values of front page
const cardE = ["AWESOME", "BEAUTIFUL", "HAPPY", "SUCCESS"];
const cardV = ["TUYỆT VỜI", "XINH ĐẸP", "HẠNH PHÚC", "THÀNH CÔNG"];
let cards = cardE.concat(cardV);

// shuffle the cards
// reference this function is from https://sebhastian.com/shuffle-array-javascript/
let shuffledCards = [];
const shuffle = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

// Generate meaning at the back of the cards
let cardsBack = [];
function cardsBackLoop(arr) {
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

function cardsBackFill(arr) {
  // bug here, when call this function everytime, its generate a new array to add on the previous one. resolved!
  if (cardsBack === null) {
    cardsBackLoop(arr)
  } else {
    cardsBack = [];
    cardsBackLoop(arr)
  }
}

// cardsFill will be called when Start button is pressed, and empty table will be filled with words
function cardsFill() {
  shuffledCards = shuffle(cards);
  for (let i = 0; i < shuffledCards.length; i++) {
    cardsTable[i].innerText = shuffledCards[i];
  }
  // everytime cardFill was called, cardsBackFill should be called also
  cardsBackFill(shuffledCards);
  cardsSwap = cardsBack;
}

// restart here, reset table, reset board result
let countMatch = 0;
let tempIdArr = [];
let tempId = [];
let temp = [];
let count2 = 0;
let count = 1
function restart() {
  countMatch = 0;
  tempIdArr = [];
  tempId = [];
  temp = [];
  count2 = 0;
  count = 1
  msg.innerText = `Click Restart for shuffling.`

  //reset border of the 2 tables
  board.removeAttribute("class");
  data.setAttribute("class", "table table-bordered");

  for (let i = 0; i < cardsTable.length; i++) {
    //push data back to home
    home[i].append(cardsTable[i]);
    // set any unexpected background color back to neutral
    home[i].style = `background-color: none;`;
  }
  //remove td from board
  for (let i = 0; i < 4; i++) {
    board.children[0].children[i].innerHTML = ``;
  }

  cardsFill();
  cardClickListen();
}

function match(temp, tempId) {
  if (temp[0] === temp[1]) {
    // when first match pair is found, board table border added
    board.setAttribute("class", "table table-bordered");
    // draw 2 columns to each board table row
    board.children[0].children[countMatch].innerHTML = `<td></td> <td></td>`;
    // access td1, td2 of row (or col1, col2 of each row)
    let td1 = board.children[0].children[countMatch].children[0];
    let td2 = board.children[0].children[countMatch].children[1];
    // push cardsTable at 2 locations clicked of the matched pair into 2 columns
    td1.append(cardsTable[tempId[0]]);
    td2.append(cardsTable[tempId[1]]);
    tempIdArr.push(tempId[0]);
    tempIdArr.push(tempId[1]);

    home[tempId[0]].removeEventListener("click", cardClicked);
    home[tempId[1]].removeEventListener("click", cardClicked);

    countMatch++;

    if (countMatch === 4) {
      //remove table border
      data.removeAttribute("class");
    }
  } else {
    home[tempId[0]].addEventListener("click", cardClicked);
    home[tempId[1]].addEventListener("click", cardClicked);
  }
}

function cardClicked(e) {
  let cardId = e.target.id;
  count++
  console.log(count)
  if (count > 20) {
    msg.innerText = `Sorry you hit 20 clicking times limit. Press restart for a new chance.`
    home.forEach((card) => {
      card.removeEventListener("click", cardClicked);
    });
  }
  // logic here.
  // also, bug here. When 1 click, all of the card will be changed backwards, except that card. resolved.
  // that text will be stored in temp
  // reset that text to cardsBack value
  // temp will be used for if statement match(temp, tempId)
  // attention: cardsBack is an array with value already, not an element grab from html, so dont use cardsBack[id].innertext
  if (count2 < 2) {

    home[cardId].style = `background-color: pink;`;
    temp[count2] = cardsTable[cardId].innerText;
    tempId[count2] = cardId;
    if (tempIdArr.length === 6 && tempId.length === 2) {
      board.children[0].children[countMatch].innerHTML = `<td></td> <td></td>`;

      let td1 = board.children[0].children[countMatch].children[0];
      let td2 = board.children[0].children[countMatch].children[1];

      td1.append(cardsTable[tempId[0]]);
      td2.append(cardsTable[tempId[1]]);
      tempIdArr.push(tempId[0]);
      tempIdArr.push(tempId[1]);
      data.removeAttribute("class");
      for (let i = 0; i < cardsTable.length; i++) {
        // set any unexpected background color back to neutral
        home[i].style = `background-color: none;`;
      }
      msg.innerText = `Congratulation! Welldone! Click restart for shuffling the cards`;
      console.log(msg);
    }
    cardsTable[cardId].innerText = cardsSwap[cardId];

    for (let i = 0; i < cardsTable.length; i++) {
      if (i !== cardId) {
        cardsTable[i].innerText = cardsSwap[i];
      }
    }
    // reset cards at the back as cardsTable, except value of the card at cardId
    if (cardsSwap === shuffledCards) {
      cardsSwap = cardsBack;
    } else {
      cardsSwap = shuffledCards;
    }

    home[cardId].removeEventListener("click", cardClicked);
    count2++;
  } else {
    match(temp, tempId);
    count2 = 0;
    count--
    cardsTable.innerText = shuffledCards;
    temp = [];
    tempId = [];

    //reset the colors back to neutral
    for (let i = 0; i < cardsTable.length; i++) {
      home[i].style = `background-color: none;`;
    }
  }
}

//eventListener for every box in the table
function cardClickListen() {
    home.forEach((card) => {
      card.addEventListener("click", cardClicked);
    });
}

restart();
// start button is pressed
start.addEventListener("click", restart);
cardClickListen();
