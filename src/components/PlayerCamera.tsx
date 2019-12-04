import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

import { addScreenshot } from "../actions";

import { AppState } from "../types";

import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

const PlayerCamera: React.FC = (props: any) => {

  let [videoStarted, updateVideoStarted] = useState(false);

  const webcamRef = useRef<Webcam>(null); 
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const capture = useCallback(
    () => {
      const current = webcamRef.current;
      if (current !== null) {
        const screenshotSource = current.getScreenshot();
        props.addScreenshot(screenshotSource);
      }
    }, 
    [webcamRef]
  );

  /* audio is not necessary.
   * needs to be able to capture a screenshot and keep it in [?redux] state
   * needs a button to capture screenshots, but should that be a part of this component?
   * videoConstraints: see definition for MediaStreamConstraints
  */ 
  
  return (
    <div className="player-camera">
      <h1>Player Cam</h1>
      {videoStarted ? (
        <p>Webcam feed ready</p>
      ) : (
        <p>Webcam feed initializing</p>
      )}
      <div className="video-stream-wrapper">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          screenshotQuality={0.8}
          videoConstraints={videoConstraints}
          onUserMedia={() => updateVideoStarted(true)}
        />
      </div>
      <button onClick={capture}>Capture a screenshot</button>
      <div className="video-screenshot-preview">
        <p>preview of the screenshot</p>
        {props.screenshot ? (
          <img src={props.screenshot} width={400}/>
        ) : (
          <p>no preview yet</p>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  screenshot: state.Camera.screenshot
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  addScreenshot: (data: any) => dispatch(addScreenshot(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCamera);