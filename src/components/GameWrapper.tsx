import React, { useState, useEffect } from 'react';
import PlayerCamera from './PlayerCamera';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { AppState } from '../types';
import { setupGame, nextWord, increaseScore } from '../actions';

interface Props {
  Game: AppState['Game'];
  Camera: AppState['Camera'];
  Recognition: AppState['Recognition'];
  setupGame: () => void;
  nextWord: (winner: string) => void;
  increaseScore: () => void;
}

const GameWrapper: React.FC<Props> = ( props ) => {
  useEffect(() => {
    props.setupGame();
  }, []);
  

  const currentWordIndex = props.Game.currentWordIndex;
  const currentWord = props.Game.words[currentWordIndex].text;

  return (
    <div className="flex flex-col">
      <div className="text-center w-full">
        <div className="text-3xl">{props.Game.timer}</div>
        <div className="text-5xl">"{currentWord}"</div>
      </div>
      <div className="flex flex-col md:flex-row md:max-w-6xl mx-auto w-full">
        <div className="words bg-gray-100 hidden flex-col mx-2 p-4 rounded shadow md:flex md:mt-5 md:w-1/6">
          {props.Game.words.map((word: any, index: number) => {
            let current, hidden, correct;
            // check if word is current word
            if (index === currentWordIndex) {
              current = true;
            }

            // check if word is correct or incorrect

            // check if words should be hidden
            if (index > currentWordIndex) {
              hidden = true;
            }
            
            return (
              <div key={index}>
                {
                  hidden ? (
                    <div><p>*****</p></div>
                  ) : (
                    <div>
                      <p>{word.text}</p>
                      {
                        !current ? (
                          correct ? (
                            <span>RIGHT</span>
                          ) : (
                            <span>WRONG</span>
                          )
                        ) : ""
                      }
                    </div>
                  )
                }                
              </div>
            )
          })}
        </div>
        <div className="flex flex-col justify-center items-center md:w-2/3">
          <PlayerCamera />
        </div>
        <div className="md:mt-5 md:px-2 md:w-1/6">
          <div>Score: {props.Game.score}</div>
          <div className="recognition-results">
            <div className="previous-screenshot-preview">
              {props.Camera.screenshot ? (
                <img src={props.Camera.screenshot} width={400} />
              ) : (
                <p>no preview yet</p>
              )}
            </div>
            <div className="previous-attempt-labels">
              {props.Recognition.labels ? (
                <div className="labels-list">
                  <ul>
                    {
                      props.Recognition.labels.slice(0, 6).map((label: any, index: number) => {
                        return <li key={index}>{label.name}</li>
                      })
                    }
                  </ul>
                </div>
              ) : (
                <div>poop</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <button onClick={() => props.nextWord('Jj')}>Skip</button>
      <button onClick={props.increaseScore}>Correct</button>
      
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  Game: state.app.Game,
  Recognition: state.app.Recognition,
  Camera: state.app.Camera
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setupGame: () => dispatch(setupGame()),
  nextWord: (winner:string) => dispatch(nextWord(winner)),
  increaseScore: () => dispatch(increaseScore()),
})

const enhancer = connect(mapStateToProps, mapDispatchToProps);
export default enhancer(GameWrapper);

/* 
  TODO
    1) Convert to function component ✔️
    2) Connect component to Redux
    3) When component loads, start game by firing off redux action

    ask david fn()()()
*/
