import React from "react";
import { Typography } from "material-ui";
import "./Account.css";

// Temp account page
const AccountPage = props => (
  <div className="ur-account">
    <Typography variant="subtitle" className="ur-account__title">
      {props.authUser && (<h1>Welcome, {props.authUser.email}</h1>)}
    </Typography>
  </div>
);

export default AccountPage;
