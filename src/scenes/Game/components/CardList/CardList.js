import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/components/Card";
import "./CardList.css";

const CardList = props =>
  <div className="ur-card-list">
    {
      props.cards.map(card =>
        (
          <Card cardDetails={card} key={card.id} />
        )
      )
    }
  </div>;

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      pow: PropTypes.number.isRequired,
      hp: PropTypes.number.isRequired,
      clk: PropTypes.number.isRequired,
      effs: PropTypes.arrayOf(PropTypes.string),
      img: PropTypes.string.isRequired,
    })
  ),
};

export default CardList;
