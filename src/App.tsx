import React from 'react';
import logo from './logo.svg';
import './App.css';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import GameWrapper from './components/GameWrapper';

Amplify.configure(awsconfig);

const App: React.FC = () => {
  return (
    <div className="App">
      <GameWrapper />
    </div>
  );
}

export default withAuthenticator(App, true);