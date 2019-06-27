import React, { Component } from 'react';
import './App.css';
import MemoryCard from './MemoryCard.js';

/****************************************/
/************HELPER FUNCTIONS************/
/****************************************/

function getRandomInt(min, max) {
    // given a mininum & maximum pair of ints, return a random int
    // between those two nums, inclusively
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(deck) {
    // takes a deck (an array of card objects) & shuffles them in place
    for (let i=0; i<deck.length; i++) {
        // get random number to be used as index into deck
        const rand = getRandomInt(0, deck.length);
        // using this random int, switch current index (via i) with new index
        // (via rand)
        const currVal = deck[i],
              newVal = deck[rand];
        deck[i] = newVal;
        deck[rand] = currVal;
    }
}

function generateDeck() {
    const symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø'];
    const deck = [];

    for (let i=0; i<16; i++) {
        const card = {
            isFlipped: false,
            Symbol: symbols[i%8]
        };
        deck.push(card);
    }

    shuffle(deck);
    return deck;
}

/**********************************/
/************COMPONENTS************/
/**********************************/

class App extends Component {
    constructor() {
        super();
        this.state = {
            deck: generateDeck(),
            pickedCards: [],
        }
    }

    render() {
        const cards = [];
        for (let i=0; i<16; i++) {
            cards.push(<MemoryCard />);
        };
    
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="title">Memory Game</h1>
                    <h3 className="subtitle">Match Cards to Win</h3>
                </header>
                <div>
                    {cards.slice(0,4)}
                </div>
                <div>
                    {cards.slice(4,8)}
                </div>
                <div>
                    {cards.slice(8,12)}
                </div>
                <div>
                    {cards.slice(12)}
                </div>
            </div>
        );
    }       
}

export default App;
