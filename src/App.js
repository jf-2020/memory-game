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
            symbol: symbols[i%8]
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

    unflipCards(card1Index, card2Index) {
        const card1 = {...this.state.deck[card1Index]},
              card2 = {...this.state.deck[card2Index]};
        card1.isFlipped = false;
        card2.isFlipped = false;

        const newDeck = this.state.deck.map((card, index) => {
            if (card1Index === index) {
                return card1;
            } else if (card2Index === index) {
                return card2;
            } else {
                return card;
            }
        });

        console.log("new deck:", newDeck);

        this.setState({
            deck: newDeck
        });

        console.log("deck:", this.state.deck);
    }

    pickCard(cardIndex) {
        if (this.state.deck[cardIndex].isFlipped) {
            return;
        } else {
            const cardToFlip = {...this.state.deck[cardIndex]};
            cardToFlip.isFlipped = true;
            let newPickedCards = this.state.pickedCards.concat(cardIndex);
            const newDeck = this.state.deck.map((card, index) => {
                if (cardIndex === index) {
                    return cardToFlip;
                }
                return card;
            });

            if (newPickedCards.length === 2) {
                const card1Index = newPickedCards[0],
                      card2Index = newPickedCards[1];

                if (newDeck[card1Index].symbol === newDeck[card2Index].symbol) {
                    setTimeout(
                        this.unflipCards.bind(this, card1Index, card2Index),
                        1000
                    );
                }
                newPickedCards = [];
            }

            this.setState({
                deck: newDeck,
                pickedCards: newPickedCards
            });
        }
    }

    render() {
        const cardsJSX = this.state.deck.map((card, index) => {
            return <MemoryCard
                        symbol={card.symbol}
                        isFlipped={card.isFlipped}
                        key={index}
                        pickCard={this.pickCard.bind(this, index)}
                    />;
        });
    
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="title">Memory Game</h1>
                    <h3 className="subtitle">Match Cards to Win</h3>
                </header>
                <div>
                    {cardsJSX.slice(0,4)}
                </div>
                <div>
                    {cardsJSX.slice(4,8)}
                </div>
                <div>
                    {cardsJSX.slice(8,12)}
                </div>
                <div>
                    {cardsJSX.slice(12)}
                </div>
            </div>
        );
    }       
}

export default App;
