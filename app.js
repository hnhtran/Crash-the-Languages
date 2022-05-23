// console.log("linked")
// const cards = document.querySelectorAll(".cards")
// console.log(cards[0].innerText)

// created one more array contains the cards array for checking
// var cardsCheck = []
// for (let i = 0; i < cards.length; i++) {
//     cardsCheck.push(cards[i].innerText)
// }
// console.log(cardsCheck)

//create an array contains values of front page
const cardE = ['AWESOME', 'BEAUTIFUL', 'HAPPPY', 'SUCCESS']
const cardV = ['TUYỆT VỜI', 'XINH ĐẸP', 'HẠNH PHÚC', 'THÀNH CÔNG']
const cards = cardE.concat(cardV)
// const cards = ['AWESOME', 'BEAUTIFUL', 'HAPPPY', 'SUCCESS', 'TUYỆT VỜI', 'XINH ĐẸP', 'HẠNH PHÚC', 'THÀNH CÔNG']
console.log(`${cards} Intial cards `)

// shuffle will be called when Start button is pressed, and empty table will be filled with words
const shuffle = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5)
}
let shuffledCards = shuffle(cards)
console.log(`${shuffledCards} First display cards when Start button pressed `)

// Generate meaning at the back of the cards
let cardsBack = []
const cardsBackFill = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < cardE.length; j++){
            if (arr[i] === cardE[j]){
                cardsBack.push(cardV[j])
            }
            if (arr[i] === cardV[j]){
                cardsBack.push(cardE[j])
            }
        }
    }
}
cardsBackFill(shuffledCards)
console.log(`${cardsBack} Back of the cards was called `)