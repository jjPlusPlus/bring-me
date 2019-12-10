export interface AppState {
  Camera: Camera;
  Game: Game;
  Recognition: Recognition;
  Player: Player;
}

export interface Camera {
  active: boolean;
  screenshot: string;
}

// export interface Screenshot {
//   data: string;
// }

export interface Game {
  timer: number;
  score: number;
  words: Word[];
  currentWordIndex: number;
  rounds: Round[];
}

export interface Word {
  text: string;
  // player who won by uuid or null if nobody got it
  winner: string;
}

export interface Recognition {
  fetching: boolean;
  labels: Label[];
  error: boolean;
  failed: boolean;
}

export interface Label {
  text: string;
  confidence: number;
}

export interface Player {
  id: string;
  username: string;
  email: string;
  stats: Stats;
}

export interface Stats {
  wins: number;
  losses: number;
}

export interface Round {
  winner: string;
}