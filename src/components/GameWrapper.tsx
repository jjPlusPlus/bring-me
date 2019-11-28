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
      <div className="text-center text-3xl w-full">{props.Game.timer}</div>
      <div className="flex flex-col md:flex-row md:max-w-6xl mx-auto w-full">
        <div className="words bg-gray-100 hidden md:flex flex-col mx-2 p-4 rounded shadow md:w-1/6">
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
        <div className="flex flex-col justify-center items-center md:w-2/3">
          <div className="text-5xl">"{currentWord}"</div>
          <PlayerCamera />
        </div>
        <div className="md:w-1/6">
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
