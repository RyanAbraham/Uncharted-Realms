import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import LandingPage from "./Landing/scenes/Landing";
import EntryPage from "./Entry/scenes/Entry";
import PasswordResetPage from "./Account/scenes/PasswordReset";
import HomePage from "./Home/Home";
import Game from "./Game/scenes/Game";
import AccountPage from "./Account/scenes/Account";
import * as routes from "../constants/routes";
import { firebase } from "../services/firebase";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import NavBar from "./NavBar/NavBar";
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
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser, _error) => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    const { authUser } = this.state;
    return (
      <Router history={history}>
        <MuiThemeProvider theme={this.theme}>
          <div>
            <NavBar authUser={authUser} history={history} />

            <Route
              exact
              path={routes.LANDING}
              component={() => <LandingPage />}
            />
            <Route exact path={routes.ENTRY} component={() => <EntryPage />} />
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
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
