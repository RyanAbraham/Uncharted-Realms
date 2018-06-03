import React, { Component } from "react";
import { Redirect } from "react-router";
import { AppBar, IconButton, Toolbar, MenuItem, Button, Menu, Typography } from "material-ui";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import * as routes from "../../constants/routes";
import { auth } from "../../services/firebase";
import "./NavBar.css";

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

  render() {
    const { anchorMenuEl, anchorProfileEl } = this.state;
    const menuOpen = Boolean(anchorMenuEl);
    const profileOpen = Boolean(anchorProfileEl);

    if (this.state.redirect) {
      return <Redirect push to={`/${this.state.redirect}`} />;
    }

    return (
      <AppBar position="static">
        <Toolbar className="ur-navbar">
          <IconButton
            className="ur-navbar__menu-button"
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
          <Typography variant="title" color="inherit" className="ur-navbar__title">
            Uncharted Realms
          </Typography>
          <div>
            {this.props.authUser
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
                    <MenuItem onClick={auth.doSignOut}>Logout</MenuItem>
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

export default NavBar;
