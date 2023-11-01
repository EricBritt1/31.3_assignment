// Part One:
//Number 1: Get fact for number

async function getFactForNumber(num) {
    let response = await axios.get(`http://numbersapi.com/${num}/math/?json`)
    console.log(response.data.text)
}

// Number 2: Print facts for multiple numbers on page

async function getFactForNumbers(arr) {
    for(i = 0; i < arr.length; i++){
        let response = await axios.get(`http://numbersapi.com/${arr[i]}/math/?json`)
        $(`<h1> ${response.data.text} </h1>`).appendTo('body')
    }
}

// Number 3: Get 4 facts for one number. Add them onto the page

async function getFactsForNumber(number, num_of_facts) {
    for(i=0; i < num_of_facts; i++) {
        let response = await axios.get(`http://numbersapi.com/${number}/math/?json`)
        $(`<h1> ${response.data.text} </h1>`).appendTo('body')
    }
}

// Part Two:
// Number 1: Make a single request and draw a card from a newly shuffled deck 

async function getSingleCard() {
    let response = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    console.log(`${response.data.cards[0].value} : ${response.data.cards[0].suit}`)
}

// Number 2: Make a request and draw card from newly shuffled deck. Then from the same deck draw another by sending another request.

async function getOneAfterAnother() {
    let first_draw = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
    let second_draw = await axios.get(`https://deckofcardsapi.com/api/deck/${first_draw.data.deck_id}/draw/?count=1`)

    console.log(`${first_draw.data.cards[0].value} : ${first_draw.data.cards[0].suit} `)
    console.log(`${second_draw.data.cards[0].value} : ${second_draw.data.cards[0].suit} `)
}

// Number 3: Build an HTML webpage that let's you draw cards from a deck. When page loads create a new shuffle deck automatically. Use the same deck to draw cards from at the click of a button.

// Stores deck id
let the_deck_id = [];

// Creates new deck as soon as document is opened
$(document).ready(function(){
    generateNewDeck()
    $('button').click(function(){
        drawTheCard()
    })
})

// Create a new deck of cards
async function generateNewDeck() {
    let response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    the_deck_id.push(response.data.deck_id)
    console.log(response.data.deck_id)
}

// Draw a card from deck
async function drawTheCard() {
    let draw = await axios.get(`https://deckofcardsapi.com/api/deck/${the_deck_id[0]}/draw/?count=1`)
    img = $(`<img src="${draw.data.cards[0].image}">`)
    img.appendTo('div')
}

//Handling button click


