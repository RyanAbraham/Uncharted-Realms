import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { firebase } from "../services/firebase";
import rq from "request-promise";

import { LinearProgress } from "material-ui";
import blue from "material-ui/colors/blue";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import LandingPage from "./Landing/scenes/Landing";
import EntryPage from "./Entry/scenes/Entry";
import PasswordResetPage from "./Account/scenes/PasswordReset";
import HomePage from "./Home/Home";
import Game from "./Game/scenes/Game";
import AccountPage from "./Account/scenes/Account";
import NavBar from "./NavBar/NavBar";
import * as routes from "../constants/routes";
import history from "./history.js";

class App extends Component {
  theme = createMuiTheme({
    palette: {
      primary: blue,
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser, _error) => {
      // if (authUser) {
      //   const options = {
      //     method: "POST",
      //     uri: "http://localhost:5000/auth/login",
      //     body: {
      //       fbToken: authUser,
      //     },
      //     json: true,
      //   };
      //   return rq(options)
      //     .then(body => {
      //       console.log("### body", body);
      //     });
      // }
      this.setState({
        authUser,
        isLoading: false,
      });
    });
  }

  render() {
    const { authUser, isLoading } = this.state;
    return (
      <Router history={history}>
        <MuiThemeProvider theme={this.theme}>
          {
            isLoading ? (<LinearProgress />)
            : (
              <div>
              <NavBar authUser={authUser} />
  
              <Route
                exact
                path={routes.LANDING}
                component={() => <LandingPage />}
              />
              <Route exact path={routes.ENTRY} component={() => <EntryPage authUser={authUser} />} />
              <Route
                exact
                path={routes.PASSWORD_RESET}
                component={() => <PasswordResetPage />}
              />
              <Route exact path={routes.HOME} component={() => <HomePage />} />
              <Route exact path={routes.GAME} component={() => <Game />} />
              <Route
                exact
                path={routes.ACCOUNT}
                component={() => <AccountPage authUser={authUser} />}
              />
            </div>)
            }
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
