import React, { Component } from "react";
import PropTypes from "prop-types";
import { auth } from "../../../services/firebase";
import * as routes from "../../../constants/routes";
import { TextField, InputAdornment, Button, IconButton } from "material-ui";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  error: undefined
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password, confirmPassword } = this.state;
    const { history } = this.props;

    if (password !== confirmPassword) {
      this.setState(byPropKey("error", { "message": "Passwords do not match" }));
    } else {
      auth
        .doCreateUserWithEmailAndPassword(email, password)
        .then(_authUser => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey("error", error));
        });
    }

    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowConfirmPassword = () => {
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  fieldStyles = {
    "width": "100%",
    "marginBottom": "24px",
  };

  render() {
    const { email, password, confirmPassword, error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          style={this.fieldStyles}
        />
        <TextField
          label="Password"
          value={password}
          onChange={event =>
            this.setState(byPropKey("password", event.target.value))
          }
          type={this.state.showPassword ? "text" : "password"}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          }}
          style={this.fieldStyles}
        />
        <TextField
          label="Confirm Password"
          type={this.state.showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={event =>
            this.setState(byPropKey("confirmPassword", event.target.value))
          }
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowConfirmPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
          }}
          style={this.fieldStyles}
        />
        <Button variant="raised" onClick={this.onSubmit}>
          Submit
        </Button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUpPage;
