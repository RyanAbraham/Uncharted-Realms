import React, { Component } from "react";
import request from "request";

const GamePage = () => (
  <div>
    <h1>Game Page</h1>
  </div>
);

class Game extends Component {
  componentDidMount() {
    request("http://localhost:5000/cards/generate/5", (err, res, body) => {
      console.log(body);
    })
  }

  render() {
    return (
      <GamePage />
    )
  }
}

export default Game;
