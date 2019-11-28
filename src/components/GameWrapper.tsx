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
    <div className="flex flex-col">
      <div className="w-full text-center text-3xl">{props.Game.timer}</div>
      <div className="flex max-w-6xl w-full mx-auto">
        <div className="words flex flex-col w-1/6 p-4 bg-gray-100 mx-2 rounded shadow">
          {props.Game.words.map((word: any, index: number) => {
            let check;
            if (word.text === currentWord) {
              check = true;
            }
            return (
              <div>
                { check ? <span>current -></span> : ""}
                <span key={index}>{word.text} </span>
              </div>
            )
          })}
        </div>
        <div className="w-2/3 flex flex-col justify-center items-center">
          <h2>Current Word: {currentWord} </h2>
          <PlayerCamera />
        </div>
        <div className="w-1/6">
          <div>Score: {props.Game.score}</div>
        </div>
      </div>
      
      <button onClick={props.nextWord}>Skip</button>
      <button onClick={props.increaseScore}>Correct</button>
      
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
