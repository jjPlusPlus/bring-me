import React from 'react';
import { Link } from 'react-router-dom';

const Lobby: React.FC = () => {
    return (
        <div className="lobby">
            <h1>Matchmaking</h1>
            <Link to="/game">Start Game</Link>
        </div>
    );
}

export default Lobby;