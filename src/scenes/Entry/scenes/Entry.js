import React, { Component } from "react";
import PropTypes from "prop-types";
import SignInPage from "./SignInPage.js";
import SignUpPage from "./SignUpPage.js";
import { withRouter } from "react-router-dom";
import { AppBar, Tabs, Tab, Typography, Paper } from "material-ui";
import "./Entry.css";
import { HOME as HOME_ROUTE } from "../../../constants/routes.js";

const PageTypes = Object.freeze({
  SIGNIN: "signin",
  SIGNUP: "signup",
});

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

const INITIAL_STATE = {
  pageType: PageTypes.SIGNIN,
};

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  handleTabClick = (event, value) => {
    this.setState({ pageType: value });
  }

  render() {
    const { pageType } = this.state;
    const { authUser, history } = this.props;
    if (authUser) {
      history.push(HOME_ROUTE);
    }

    return (
      <div className="ur-entry">
        <AppBar className="ur-entry__appbar" position="static">
          <Tabs value={pageType} onChange={this.handleTabClick}>
            <Tab value={PageTypes.SIGNIN} label="Sign In" />
            <Tab value={PageTypes.SIGNUP} label="Create Account" />
          </Tabs>
        </AppBar>
        <div className="ur-entry__container">
          <Paper>
            <TabContainer>
              {
                pageType === PageTypes.SIGNIN
                  ? <SignInPage history={this.props.history} />
                  : <SignUpPage history={this.props.history} />
              }
            </TabContainer>
          </Paper>
        </div>
      </div>
    );
  }
}

EntryForm.propTypes = {
  authUser: PropTypes.object,
  // Provided by wrapping the class with 'withRouter'
  history: PropTypes.object.isRequired,
};

export default withRouter(EntryForm);
