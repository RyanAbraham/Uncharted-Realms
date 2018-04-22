import React, { Component } from "react";
import request from "request";
import Card from "./Card/components/Card";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  componentDidMount() {
    request("http://localhost:5000/cards/generate/5", (err, res, body) => {
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
                })
      });
      
    });
  }

  render() {
    return (
      <div>
        <h1>Game Page</h1>
        {
          this.state.cards.map(card => 
            (
              <Card cardDetails={card} key={card.id} />
            )
          )
        }
      </div>
    );
  }
}

export default Game;
