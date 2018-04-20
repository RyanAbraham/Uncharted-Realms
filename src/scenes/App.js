import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./Navigation";
import LandingPage from "./Landing/Landing";
import SignUpPage from "./Account/scenes/SignUp";
import SignInPage from "./Account/scenes/SignIn";
import PasswordResetPage from "./Account/scenes/PasswordReset";
import HomePage from "./Home/Home";
import Game from "./Game/Game";
import AccountPage from "./Account/scenes/Account";
import * as routes from "../constants/routes";
import { firebase } from "../services/firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      shouldShowNav: true
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser, _error) => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  gameStart = () => {
    this.setState(() => ({ shouldShowNav: false }))
  }

  render() {
    return (
      <Router>
        <div>
          {
            this.state.shouldShowNav &&
              <div>
                <Navigation
                  authUser={this.state.authUser}
                  gameStartCallback={this.gameStart} />
                <hr />
              </div>
          }

          <Route
            exact
            path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
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
            component={() => <AccountPage />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
