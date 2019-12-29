import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux"; 
import { Dispatch, AnyAction } from "redux";

import { socketConnect } from "../actions";
import { propStyle } from "aws-amplify-react";

const Lobby: React.FC = (props: any) => {

  // fire off the action to make the WS connection
  // todo: use an env variable to poin to the wsServer
  const socket = useEffect(()=> {
    props.socketConnect("ws://127.0.0.1:8080");
    return () => {
      // cleanup here, disconnect from socket
      props.closeSocket();
    }
  }, []);

  return (
    <div className="lobby">
      <div className="flex flex-row">
        <section className="flex-1 p-4">
          <h1 className="text-2xl">Players</h1>
          <div className="p-2">
            <p className="text-xl">Online</p>
            <ul>
              {props.Lobby && props.Lobby.online && 
                props.Lobby.online.map((online: any, index: any) => {
                  console.log(online);
                  return <div key={index}>{online.id}: {online.name}</div>;
                })
              }
              {/* <li>JJplusplus</li>
              <li>nullSector</li>
              <li>franchizzles</li>
              <li>troolstoll</li>
              <li>deanomite</li> */}
            </ul>
          </div>
          <div className="p-2">
            <p className="text-xl">Offline</p>
            <ul>
              {/* <li>XtraSalty</li>
              <li>Squortellini</li>
              <li>brosefGeorge</li>
              <li>SaltySurprise</li>
              <li>x100xPercentx</li>
              <li>...</li> */}
            </ul>
          </div>
        </section>
        <section className="flex-1 p-4">
          <h1 className="text-2xl">Matchmaking</h1>
          <div className="p-4">
            <p className="text-xl">Groups</p>
            <div className="group bg-gray-200 p-2">
              <ul>
                {/* <li>Jjonak</li>
                <li>Pokpo</li>
                <li>DoubleLift</li>
                <li>dddrewsky</li>
                <li>Pokimane</li> */}
              </ul>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xl">Waiting...</p>
            <ul>
              {/* <li>cakeGirl</li>
              <li>SaltyLemon</li> */}
            </ul>
          </div>
        </section>
        <section className="flex-1 p-4">
          <h1 className="text-2xl">Matches In Progress</h1>
          <div className="group bg-gray-200 p-2 m-2">
            <ul>
              {/* <li>Fleta (2)</li>
              <li>BigGoose (2)</li>
              <li>AirChronicles (1) </li>
              <li>PerfectlySalted</li>
              <li>Pokimane</li> */}
            </ul>
          </div>
          <div className="group bg-gray-200 p-2 m-2">
            <ul>
              {/* <li>Jjonak (4)</li>
              <li>Pokpo</li>
              <li>DoubleLift</li>
              <li>dddrewsky</li>
              <li>Pokimane</li> */}
            </ul>
          </div>
        </section>
      </div>
      <div className="p-4 text-4xl">
        <button className="block">Start Matchmaking</button>
        <button className="block">
          <Link to="/game">Single-Player Mode</Link>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  Lobby: state.Lobby
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  socketConnect: (host: string) => dispatch(socketConnect(host))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);