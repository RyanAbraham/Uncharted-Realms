import React, { Component } from "react";
import { auth } from "../../../services/firebase";
import * as routes from "../../../constants/routes";
import { TextField, InputAdornment, Button, IconButton } from "material-ui";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: undefined,
  showPassword: false,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(_authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  fieldStyles = {
    "width": "100%"
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div>
        <form className="signin-form" onSubmit={this.onSubmit}>
          <div>
            <TextField
              label="Email"
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
              style={this.fieldStyles}
            />
          </div>
          <TextField
            label="Password"
            value={password}
            onChange={event =>
              this.setState(byPropKey("password", event.target.value))
            }
            margin="normal"
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
          <Button variant="raised" onClick={this.onSubmit} style={{ "marginTop": "24px" }}>
            Login
          </Button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default SignInPage;
