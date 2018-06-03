import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../../services/firebase";
import * as routes from "../../../constants/routes";

const SignUpPage = ({ history }) => (
  <div>
    <h1>Sign Up Page</h1>
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: undefined
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(_authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey("username", event.target.value))
          }
          type="text"
          placeholder="Username"
        />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey("password", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          value={confirmPassword}
          onChange={event =>
            this.setState(byPropKey("confirmPassword", event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignUpPage);

export { SignUpForm };
