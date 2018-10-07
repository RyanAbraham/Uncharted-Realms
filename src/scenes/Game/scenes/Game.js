import React, { Component } from "react";
import { LinearProgress } from "material-ui";
import rq from "request-promise";
import Hand from "../components/Hand/Hand";
import "./Game.css";

const NUM_PLAYERS = 2;

const INITIAL_STATE = {
  decks: [],
  hands: [],
  turn: 0,
  isLoading: true,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  componentDidMount() {
    this.startGame();
  }

  render() {
    const { isLoading, hands } = this.state;
    return (
      <div>
        {
          isLoading ? (<LinearProgress />)
          : (
            <div className="ur-game">
              {
                hands.map((hand, idx) => (
                  <div className="hand" key={idx}>
                    <Hand cards={hand} />
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }

  startGame() {
    let { decks, hands } = this.state;
    for (let i=0; i<NUM_PLAYERS; i++) {
      decks[i] = [];
      hands[i] = [];
    }

    decks = decks.map(_deck => {
      return rq("http://localhost:5000/cards/generate/2")
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
