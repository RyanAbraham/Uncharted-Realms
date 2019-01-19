import React, { Component } from "react";
import { LinearProgress } from "material-ui";
import rq from "request-promise";
import CardList from "../components/CardList/CardList";
import "./Game.css";

const ANIMATION_TYPES = Object.freeze({
	"startTurn": 0,
	"drawCard": 1,
	"playCard": 2,
	"cardClocksDown": 3,
	"cardAttacks": 4,
	"cardAttacked": 5,
	"cardDies": 6,
	"cardStatIncrease": 7,
	"cardStatDecrease": 8,
	"shuffleDeck": 9,
	"playerAttacked": 10,
	"playerGainsLife": 11,
});

const INITIAL_STATE = {
  decks: [[], []],
  hands: [[], []],
  fields: [[], []],
  animations: [],
  seed: -1,
  winner: -1,
  uuidCounter: 0,
  isLoading: true,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    return rq("http://localhost:8080/debug")
    .then(body => {
      // In the future, this will be received from the matchamking response
      // before you even enter the game, so no request will need to be made
      const { decks, animationLog, seed, winner } = JSON.parse(body);
      this.setState({
        decks,
        animations: animationLog.animations,
        seed,
        winner,
        isLoading: false,
      });
    })
    .then(() => {
      return this.setupGame();
    })
    .then(() => {
      return this.playGame();
    });
  }

  render() {
    const { isLoading, hands, fields } = this.state;
    return (
      <div>
        {
          isLoading ? (<LinearProgress />)
          : (
            <div className="ur-game">
              <div className="ur-game__card-lists">
                <CardList cards={hands[1]} />
                <CardList cards={fields[1]} />
                <CardList cards={fields[0]} />
                <CardList cards={hands[0]} />
              </div>
            </div>
          )
        }
      </div>
    );
  }

  setupGame() {
    let { decks, uuidCounter } = this.state;
    for (let i = 0; i < decks.length; i++) {
      decks[i] = decks[i].cards;
    }
    for (const deck of decks) {
      for (const card of deck) {
        card.id = uuidCounter++;
      }
    }
    return this.setState({
      decks,
      uuidCounter,
    });
  }

  async playGame() {
    const { animations } = this.state;
    for (const ani of animations) {
      switch (ani.type) {
        case ANIMATION_TYPES.startTurn:
          await this.startTurn();
          break;
        case ANIMATION_TYPES.drawCard:
          await this.drawCard(ani.p);
          break;
        case ANIMATION_TYPES.playCard:
          await this.playCard(ani.p, ani.cIdx);
          break;
        case ANIMATION_TYPES.cardClocksDown:
          await this.cardClocksDown(ani.p, ani.cIdx);
          break;
        case ANIMATION_TYPES.cardAttacks:
          await this.cardAttacks(ani.p, ani.cIdx);
          break;
        case ANIMATION_TYPES.cardAttacked:
          await this.cardAttacked(ani.p, ani.cIdx, ani.val);
          break;
        case ANIMATION_TYPES.cardDies:
          console.log("hello!");
          await this.cardDies(ani.p, ani.cIdx);
          break;
        case ANIMATION_TYPES.cardStatIncrease:
          await this.cardStatIncrease(ani.p, ani.cIdx, ani.val, ani.loc);
          break;
        case ANIMATION_TYPES.cardStatDecrease:
          await this.cardStatDecrease(ani.p, ani.cIdx, ani.val, ani.loc);
          break;
        case ANIMATION_TYPES.shuffleDeck:
          await this.shuffleDeck(ani.p);
          break;
        case ANIMATION_TYPES.playerAttacked:
          await this.playerAttacked(ani.p, ani.val);
          break;
        case ANIMATION_TYPES.playerGainsLife:
          await this.playerGainsLife(ani.p, ani.val);
          break;
      }
    }
  }
  
  /*
   * For all below functions:
   * p: player
   * i: card index
   * v: value/amount
   * l: location of card (zone)
   */

	async startTurn(p) {

  }

  async drawCard(p) {
    const { decks, hands } = this.state;
    if (decks[p].length > 0) {
      // This should never be 0 or less, but this avoids a crash in case of bug
      hands[p].push(decks[p].pop());
    }
    await this.setStatePromise({
      decks,
      hands,
    }).then(() => timeout(500));
  }

	async playCard(p, i) {
    const { hands, fields } = this.state;
    fields[p].push(hands[p][i]);
    hands[p].splice(i, 1);
    await this.setStatePromise({
      hands,
      fields,
    }).then(() => timeout(500));
  }

	async cardClocksDown(p, i) {
    const { hands } = this.state;
    hands[p][i].clk--;
    await this.setStatePromise({
      hands,
    }).then(() => timeout(500));
  }

	async cardAttacks(p, i) {

  }

	async cardAttacked(p, i, v) {
    const { fields } = this.state;
    fields[p][i].hp--;
    await this.setStatePromise({
      fields,
    }).then(() => timeout(500));
  }

	async cardDies(p, i) {
    const { fields } = this.state;
    console.log("### fields", fields);
    let field = fields[p];
    field.splice(i, 1);
    fields[p] = field;
    console.log("### fields", fields);
    await this.setStatePromise({
      fields,
    }).then(() => timeout(500));
  }

	async cardStatIncrease(p, i, v, l) {

  }

	async cardStatDecrease(p, i, v, l) {

  }

	async shuffleDeck(p) {

  }

	async playerAttacked(p, v) {

  }

	async playerGainsLife(p, v) {

  }

  setStatePromise = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => resolve());
    });
  }
}

/**
 * https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place
 * @param {Array} a items An array containing the items.
 */
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const timeout = (ms) => new Promise(res => setTimeout(res, ms));

export default Game;
