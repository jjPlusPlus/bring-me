export interface AppState {
  Camera: Camera;
  Game: Game;
  Recognition: Recognition;
  Player: Player;
}

export interface Camera {
  active: boolean;
  screenshot: Screenshot;
}

export interface Screenshot {
  data: string;
}

export interface Game {
  timer: number;
  score: number;
  words: Word[];
  currentWordIndex: number;
}

export interface Word {
  text: string;
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
  username: string;
  email: string;
  stats: Stats;
}

export interface Stats {
  wins: number;
  losses: number;
}
