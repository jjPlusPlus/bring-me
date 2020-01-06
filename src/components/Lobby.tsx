import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux"; 
import { Dispatch, AnyAction } from "redux";

import { socketConnect, socketDisconnect, startMatchMaking, cancelMatchMaking } from "../actions";

const Lobby: React.FC = (props: any) => {
  const socket = useEffect(() => {
    props.socketConnect("ws://127.0.0.1:8080/lobby");
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
    <div className="lobby">
      <div className="flex flex-row">
        <section className="flex-1 p-4">
          <h1 className="text-2xl">Players</h1>
          <div className="p-2">
            <p className="text-xl">Online</p>
            <ul>
              {props.Lobby && props.Lobby.online && 
                props.Lobby.online.map((online: any, index: any) => {
                  return <li key={index}>{online.name}</li>;
                })
              }
            </ul>
          </div>
          <div className="p-2">
            <p className="text-xl">All Players</p>
            <ul>
              {props.Lobby && props.Lobby.offline &&
                props.Lobby.offline.map((offline: any, index: any) => {
                  return <li key={index}>{offline.Username}</li>;
                })
              }
            </ul>
          </div>
        </section>
        <section className="flex-1 p-4">
          <h1 className="text-2xl">Matchmaking</h1>
          <div className="p-4">
            <p className="text-xl">Groups (waiting to start a match)</p>
            <div className="group bg-gray-200 p-2">
              <ul>
                {props.Lobby && props.Lobby.matchMakingQueue &&
                  props.Lobby.matchMakingQueue.groups.map((group: any, groupIndex: any) => {
                    return <li key={groupIndex}>
                      <ul>
                        { 
                          group.map((player: any, playerIndex: any) => {
                            return <li key={playerIndex}>
                              {player.name}
                            </li>
                          })
                        }
                      </ul>
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xl">Waiting for (n) more players...</p>
            <ul>
              {props.Lobby && props.Lobby.matchMakingQueue && 
                props.Lobby.matchMakingQueue.waiting.map((player: any, index: any) => {
                  return <li key={index}>{player.name}</li>;
                })
              }
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
        <button className="block" onClick={() => props.startMatchMaking()}>Start Matchmaking</button>
        <button className="block" onClick={() => props.cancelMatchMaking()}>Cancel Matchmaking</button>
        <button className="block">
          <Link to="/game">Single-Player Mode</Link>
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  Lobby: state.app.Lobby
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  socketConnect: (host: string) => dispatch(socketConnect(host)),
  socketDisconnect: () => dispatch(socketDisconnect()),
  startMatchMaking: () => dispatch(startMatchMaking()),
  cancelMatchMaking: () => dispatch(cancelMatchMaking()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);