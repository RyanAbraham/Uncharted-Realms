import React, { Component } from "react";
import SignInPage from "../components/SignInPage.js";
import { withRouter } from "react-router-dom";
import { AppBar, Tabs, Tab, Typography, Paper } from "material-ui";
import "./Entry.css";

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
              {pageType === PageTypes.SIGNIN && <SignInPage />}
              {pageType === PageTypes.SIGNUP && <TabContainer>Registration Page Placeholder</TabContainer>}
            </TabContainer>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(EntryForm);
