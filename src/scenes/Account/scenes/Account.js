import React from "react";
import PropTypes from "prop-types";
import { Typography } from "material-ui";
import "./Account.css";

// Temp account page
const AccountPage = props => (
  <div className="ur-account">
    <Typography variant="title" className="ur-account__title">
      {props.authUser && (<div>Welcome, {props.authUser.email}</div>)}
    </Typography>
  </div>
);

AccountPage.propTypes = {
  authUser: PropTypes.object,
};

export default AccountPage;
