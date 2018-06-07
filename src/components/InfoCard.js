import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "material-ui";
import "./InfoCard.css";

class InfoCard extends Component {
  render() {
    const { title, body } = this.props;
    return (
      <Card className="ur-info-card">
        <CardContent>
          <Typography variant="title" className="ur-info-card__title">
            {title}
          </Typography>
          <Typography className="ur-info-card__body">
            {body}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default InfoCard;
