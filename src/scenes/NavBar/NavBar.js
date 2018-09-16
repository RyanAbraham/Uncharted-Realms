import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { AppBar, IconButton, Toolbar, MenuItem, Button, Menu, Typography } from "material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as routes from "../../constants/routes";
import { auth } from "../../services/firebase";

const toolbarStyles = {
  "justifyContent": "space-between",
};

class NavBar extends Component {
  state = {
    anchorMenuEl: null,
    anchorProfileEl: null,
  };

  handleMenuClick = event => {
    this.setState({ anchorMenuEl: event.currentTarget });
  };

  handleProfileMenuClick = event => {
    this.setState({ anchorProfileEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorMenuEl: null, anchorProfileEl: null });
  };

  handleRedirect = (route) => {
    const { history } = this.props;
    history.push(route);
    this.handleClose();
  }

  handleSignout = () => {
    const { history } = this.props;
    auth
      .doSignOut()
      .then(history.push(routes.LANDING));
  }

  render() {
    const { anchorMenuEl, anchorProfileEl } = this.state;
    const { location, authUser } = this.props;
    const menuOpen = Boolean(anchorMenuEl);
    const profileOpen = Boolean(anchorProfileEl);

    if (location.pathname === routes.LANDING) {
      return null;
    }

    return (
      <AppBar position="static">
        <Toolbar style={toolbarStyles}>
          <div>
            {authUser &&
              <div>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={this.handleMenuClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="ur-menu"
                  anchorEl={anchorMenuEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={menuOpen}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.handleRedirect(routes.GAME)}>Game</MenuItem>
                </Menu>
              </div>
            }
          </div>
          <Typography variant="title" color="inherit">
            Uncharted Realms
          </Typography>
          <div>
            {authUser
              ? (
                <div>
                  <IconButton
                    aria-owns={profileOpen ? "menu-appbar" : null}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuClick}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="ur-account-menu"
                    anchorEl={anchorProfileEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={profileOpen}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={() => this.handleRedirect(routes.ACCOUNT)}>Profile</MenuItem>
                    <MenuItem onClick={this.handleSignout}>Logout</MenuItem>
                  </Menu>
                </div>
              )
              : (
                <Button onClick={() => this.handleRedirect(routes.ENTRY)} color="inherit">Login</Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  authUser: PropTypes.object,
  // These props are provided by wrapping the class with 'withRouter'
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(NavBar);
