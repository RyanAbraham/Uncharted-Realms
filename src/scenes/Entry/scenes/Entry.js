import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../../services/firebase";
import * as routes from "../../../constants/routes";
import { AppBar, Tabs, Tab, TextField, InputAdornment, Button, Typography, IconButton, Paper } from "material-ui";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./Entry.css";

// TODO: Separate logic from container component

const PageTypes = Object.freeze({
  SIGNIN: "signin",
  SIGNUP: "signup",
});

const SignInPage = ({ history }) => (
  <div>
    <EntryForm history={history} />
  </div>
);

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: undefined,
  showPassword: false,
  pageType: PageTypes.SIGNIN,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class EntryForm extends Component {
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

  handleTabClick = (event, value) => {
    this.setState({ pageType: value });
  }

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
    const { email, password, error, pageType } = this.state;

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
            {pageType === PageTypes.SIGNIN && <TabContainer>
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
                <div>
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
                </div>
                <Button variant="raised" onClick={this.onSubmit} style={{ "margin-top": "24px" }}>
                  Login
              </Button>
                {error && <p>{error.message}</p>}
              </form>
            </TabContainer>}
            {pageType === PageTypes.SIGNUP && <TabContainer>Registration Page Placeholder</TabContainer>}
          </Paper>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { EntryForm };
