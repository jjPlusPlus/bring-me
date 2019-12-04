import React, { useState, useEffect } from 'react';
import PlayerCamera from './PlayerCamera';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { AppState } from '../types';
import { setupGame, nextWord, increaseScore } from '../actions';

const GameWrapper: React.FC = ( props: any ) => {
  useEffect(() => {
    props.setupGame();
  }, []); // jj says this is terrible.
  console.log(props)
  const currentWord = props.Game.words[props.Game.currentWordIndex].text;
  return (
    <div>
      <div>Score: {props.Game.score}</div>
      <div>Words: {props.Game.words.map((word: any, index: number) => {
        return (
          <span key={index}>{word.text} </span>
        )
      })}</div>
      <div>Timer: {props.Game.timer}</div>
      <h2>Current Word: {currentWord} </h2>
      <button onClick={props.nextWord}>Skip</button>
      <button onClick={props.increaseScore}>Correct</button>
      <PlayerCamera />
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  ...state,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setupGame: () => dispatch(setupGame()),
  nextWord: () => dispatch(nextWord()),
  increaseScore: () => dispatch(increaseScore()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameWrapper);

/* 
  TODO
    1) Convert to function component ✔️
    2) Connect component to Redux
    3) When component loads, start game by firing off redux action

    ask david fn()()()
*/
