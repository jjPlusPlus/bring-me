import React from 'react';
import './App.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import GameWrapper from './components/GameWrapper';
import Lobby from './components/Lobby';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const App: React.SFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <GameWrapper />
        </Route>
        <Route path="/">
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App, true);