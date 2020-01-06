import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Dispatch, AnyAction } from "redux";

import { useParams } from "react-router-dom";

import { socketConnect, socketDisconnect, startMatchMaking, cancelMatchMaking } from "../actions";

const Match: React.FC = (props: any) => {
  const { channel, port } = useParams();
  console.log(port, channel);
  const socket = useEffect(() => {
    props.socketConnect(`ws://127.0.0.1:${port}/${channel}`);
    window.addEventListener('beforeunload', () => {
      props.socketDisconnect();
    });
    return () => {
      props.socketDisconnect();
      window.removeEventListener('beforeunload', props.socketDisconnect());
    }
  }, []);

  console.log(props);

  return (
    <div className="match">
      
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  lol: state.app.Match
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  socketConnect: (host: string) => dispatch(socketConnect(host)),
  socketDisconnect: () => dispatch(socketDisconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);