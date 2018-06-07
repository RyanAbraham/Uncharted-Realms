import React, { Component } from "react";
import { LinearProgress } from "material-ui";
import request from "request";
import Card from "./Card/components/Card";
import "./Game.css";

const INITIAL_STATE = {
  cards: [],
  loading: true,
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }
  componentDidMount() {
    request("http://localhost:5000/cards/generate/5", (err, res, body) => {
      if (!err) {
        this.setState({
          cards: JSON.parse(body).cards.map(card => {
            return {
              "id": card.id,
              "name": card.name,
              "pow": card.pow,
              "hp": card.hp,
              "clk": card.clk,
              "eff": card.eff,
              "img": card.img,
            };
          }),
          loading: false,
        });
      }
    });
  }

  render() {
    const { loading, cards } = this.state;
    return (
      <div>
        {loading && (<LinearProgress />)}
        <div className="ur-game">
          {
            cards.map(card =>
              (
                <Card cardDetails={card} key={card.id} />
              )
            )
          }
        </div>
      </div>
    );
  }
}

export default Game;
