import React from "react";
import { Typography, Paper, Button } from "material-ui";
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
      Body text
    </div>
  </div>
);

export default LandingPage;
