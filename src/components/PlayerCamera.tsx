import React, { useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

import { recognizeImage } from "../actions";

import { AppState } from "../types";

import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { TiCameraOutline, TiMediaRecord } from "react-icons/ti";

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
        props.recognizeImage(screenshotSource);
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
    <div className="player-camera w-full">
      <div className="flex items-center">
        <h1 className="px-1 text-gray-500 text-sm">Player Cam</h1>
        {videoStarted ? (
            <span className="text-light-green"><TiMediaRecord /></span>        
        ) : (
          <p>Webcam feed initializing...</p>
        )}
      </div>
      <div className="video-stream-wrapper bg-powder-blue">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          screenshotQuality={0.8}
          videoConstraints={videoConstraints}
          onUserMedia={() => updateVideoStarted(true)}
        />
      </div>
      <button className="bg-bright-orange flex h-10 justify-center mx-auto my-4 rounded-full text-xl text-white w-10" onClick={capture}>
        <TiCameraOutline />
      </button>
      <div className="video-screenshot-preview">
        <p>preview of the screenshot</p>
        {props.screenshot ? (
          <img src={props.screenshot} />
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
  recognizeImage: (data: any) => dispatch(recognizeImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCamera);