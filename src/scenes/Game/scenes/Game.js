import React, { Component } from "react";
import { LinearProgress } from "material-ui";
import rq from "request-promise";
import CardList from "../components/CardList/CardList";
import "./Game.css";

const NUM_PLAYERS = 2;
const GAME_STATES = Object.freeze({
  "EMPTY": 0,
  "LOADING": 1,
  "TURN_IN_PROGRESS": 2,
});

const INITIAL_STATE = {
  decks: [],
  hands: [],
  fields: [],
  turn: 0,
  isLoading: true,
  gameState: GAME_STATES.LOADING,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  componentDidMount() {
    this.startGame();
  }

  componentDidUpdate() {
    const { gameState } = this.state;
    if (gameState === GAME_STATES.EMPTY) {
      console.log("STARTING TURN");
      this.setState({
        gameState: GAME_STATES.TURN_IN_PROGRESS,
      }, () => {
        setTimeout(this.doTurn.bind(this), 2000);
      });
    }
  }

  render() {
    const { isLoading, hands, fields } = this.state;
    return (
      <div>
        {
          isLoading ? (<LinearProgress />)
          : (
            <div className="ur-game">
              {
                hands.map((hand, idx) => (
                  <div className="hand" key={idx}>
                    <CardList cards={hand} /> 
                    <CardList cards={fields} /> 
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }

  doTurn() {
    let { hands, decks, fields, turn } = this.state;
    const currentPlayer = turn % NUM_PLAYERS;
    hands[currentPlayer] = hands[currentPlayer].map(card => {
      return {
        ...card,
        clk: card.clk - 1,
      };
    });

    // Draw a card
    // TODO: Abstract this to its own function
    hands[currentPlayer].push(decks[currentPlayer].pop());

    this.setState({
      hands,
      fields,
      turn: turn + 1,
      gameState: GAME_STATES.EMPTY,
    });
  }


  startGame() {
    let decks = [];
    let hands = [];
    const fields= [];
    for (let i=0; i<NUM_PLAYERS; i++) {
      decks[i] = [];
      hands[i] = [];
      fields[i] = [];
    }

    decks = decks.map(_deck => {
      return rq("http://localhost:5000/cards/generate/10")
      .then(body => {
        return JSON.parse(body).cards.map(card => ({
          "id": card.id,
          "name": card.name,
          "pow": card.pow,
          "hp": card.hp,
          "clk": card.clk,
          "eff": card.eff,
          "img": card.img,
        }));
      });
    });
    Promise.all(decks).then((decks) => {
      // Shuffle each deck
      decks = decks.map(deck => shuffle(deck));
      // Draw each player's starting hand
      hands = hands.map((hand, idx) => {
        return [ decks[idx].pop() ];
      });

      this.setState({
        decks,
        hands,
        isLoading: false,
        gameState: GAME_STATES.EMPTY,
      });
    });
  }
}

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default Game;
