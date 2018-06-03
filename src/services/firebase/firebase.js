import firebase from "firebase/app";
import "firebase/auth";
// TODO: Use process.env to allow deployment from Heroku
import { devConfig, prodConfig } from "./firebase.config";

// Use production config only if production mode is enabled
const config = process.env.NODE_ENV === "production" // eslint-disable-line no-undef
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};
