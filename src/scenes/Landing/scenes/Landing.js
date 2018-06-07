import React from "react";
import { Typography, Paper, Button } from "material-ui";
import InfoCard from "../../../components/InfoCard";
import "./Landing.css";

const LandingPage = () => (
  <div className="ur-landing">
    <Paper className="ur-landing-splash__material-container" color="inheret">
      <div className="ur-landing-splash__container">
        <div className="ur-landing-splash__content">
          <Typography variant="title" color="inherit" className="ur-landing-splash__title">
            Uncharted Realms
          </Typography>
          <Typography variant="title" color="inherit" className="ur-landing-splash__subtitle">
            A card game about adventure, discovery, and new experiences
          </Typography>
          <Button href="/entry" variant="raised" className="ur-landing-splash__login-button">Login</Button>
        </div>
      </div>
    </Paper>
    <div className="ur-landing-body">
      <InfoCard
        title="Endless Content"
        body="All cards are generated completely from scratch, from their name to their stats and abilities. Every card is brand new, never seen before!"
      />
      <InfoCard
        title="Dynamic Gameplay"
        body="With exciting card mechanics and an always fresh card pool, every deck you create will have its own totally unique feel."
      />
      <InfoCard
        title="True Balance"
        body="As games go on, generated cards are monitored for their performance and usage. The card generation algorithm is always tweaking itself as it finds new trends and breakout strategies."
      />
    </div>
  </div>
);

export default LandingPage;
