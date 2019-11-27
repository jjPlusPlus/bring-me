import React, { Component } from 'react';
import PlayerCamera from './PlayerCamera';

class GameWrapper extends Component {
  render() {
      return (
          <div>
            <PlayerCamera />
          </div>
      )
  }
}

export default GameWrapper;