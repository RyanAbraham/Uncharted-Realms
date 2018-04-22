import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card__name">{this.props.cardDetails.name}</div>
                <div className="card__pow">{this.props.cardDetails.pow}</div>
                <div className="card__hp">{this.props.cardDetails.hp}</div>
                <img src={this.props.cardDetails.img} alt="Card Artwork" />
            </div>
        );
    }
}

export default Card;
