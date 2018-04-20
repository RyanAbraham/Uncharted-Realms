import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./Account/components/SignOutButton";
import * as routes from "../constants/routes";

const Navigation = ({ authUser, gameStartCallback }) => (
  <div>{
    authUser
      ? <NavigationAuth gameStartCallback={gameStartCallback} />
      : <NavigationNonAuth />
  }</div>
);

const NavigationAuth = ({ gameStartCallback }) => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li onClick={gameStartCallback}>
      <Link to={routes.GAME}>Game</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
