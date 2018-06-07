import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends Component {
  render() {
    const { name, clk, img, pow, hp } = this.props.cardDetails;
    return (
      <div className="card">
        <div className="card__name">{name}</div>
        <div className="card__clock">{clk}</div>
        <img className="card__img" src={img} alt="Card Artwork" />
        <div className="card__stats">
          <div className={"card__power " + (pow > 9 ? "card__power--long" : "")}>
            {pow}
          </div>
          <div className={"card__hp " + (hp > 9 ? "card__hp--long" : "")}>
            {hp}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  cardDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    pow: PropTypes.number.isRequired,
    hp: PropTypes.number.isRequired,
    clk: PropTypes.number.isRequired,
    eff: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
