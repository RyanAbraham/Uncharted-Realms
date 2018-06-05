import React from "react";
import { Typography, Paper, Button } from "material-ui";
import "./Landing.css";

const LandingPage = () => (
  <div className="ur-landing">
    <Paper className="ur-landing__splash-material" color="inheret">
      <div className="ur-landing__splash">
        <div className="ur-landing__splash-content">
          <Typography variant="title" color="inherit" className="ur-landing__title">
            Welcome to Uncharted Realms!
          </Typography>
          <Button href="/entry" color="inherit">Login</Button>
        </div>
      </div>
    </Paper>
    <div className="ur-landing__body">
      Body text
    </div>
  </div>
);

export default LandingPage;
