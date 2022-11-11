type GameObject = {
  gameBoard: Player[][] | null;
  playerName?: [string, string];
  playerTurn: Player;
  score: [number, number];
  gameState: "config" | "ready" | "running" | "end" | "closed";
  winner: Player;
  config: [number, number, number];
  sockets: [string | null, string | null];
  lastMove: [number, number, 1 | 2] | null;
  winningSlots: [number, number][] | null;
  playAgain: [boolean, boolean];
  playerStartedLast: 1 | 2 | null;
};

type Player = 1 | 2 | null;
type GameState = "config" | "ready" | "running" | "end" | "closed";

type WinningSlots = number[][] | null;

interface LeaveEventPayload {
  player: Player;
  gameState: GameState;
}

interface ErrorMessage {
  errorCode: number;
  errorMessage: string;
}

type GameBoard = Player[][] | null;

type LastMove = [number, number, 1 | 2] | null;

//socket types
interface ServerToClientEvents {
  "game-update": (a: GameObject, b?: string) => void;
  error: (a: ErrorMessage) => void;
}

interface ClientToServerEvents {
  "new-game": () => void;
  "config-ready": (a: number[], b: string) => void;
  "join-game": (a: string) => void;
  "column-click": (a: number, b: 1 | 2, c: string) => void;
  "play-again": (a: string, b?: number[]) => void;
  "leave-game": () => void;
}

export type {
  GameObject,
  Player,
  GameState,
  LeaveEventPayload,
  GameBoard,
  LastMove,
  WinningSlots,
  ErrorMessage,
  ClientToServerEvents,
  ServerToClientEvents,
};
