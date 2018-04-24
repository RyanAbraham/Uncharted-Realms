import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card__name">{this.props.cardDetails.name}</div>
                <div className="card__clock">{this.props.cardDetails.clk}</div>
                <img className="card__img" src={this.props.cardDetails.img} alt="Card Artwork" />
                <div className="card__stats">
                <div className={"card__power " + (this.props.pow >= 5 ? "card__power--long" : "")}>
                    {this.props.cardDetails.pow}
                </div>
                <div className="card__hp">{this.props.cardDetails.hp}</div>
                </div>
            </div>
        );
    }
}

export default Card;
