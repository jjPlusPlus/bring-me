import React from "react";
import "./App.css";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { AmazonAIPredictionsProvider } from "@aws-amplify/predictions";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import GameWrapper from "./components/GameWrapper";
import Lobby from "./components/Lobby";

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const App = () => {
  return (
    <Switch>
      <Route path="/game">
        <GameWrapper />
      </Route>
      <Route path="/">
        <Lobby />
      </Route>
    </Switch>
  );
}

const authConfig = {
  hiddenDefaults: [
    "email",
    "phone_number",
    "username"
  ],
  signUpFields: [
    {
      label: "Email",
      key: "email",
      required: true,
      type: "string"
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      type: "password"
    }
  ],
  usernameAttributes: "Username"
};

export default withAuthenticator(App, true, [], null, null, authConfig);