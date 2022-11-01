type Player = 1 | 2 | null;
type GameState = "config" | "ready" | "running" | "end" | "closed";

interface LeaveEventPayload {
  player: Player;
  gameState: GameState;
}

type GameBoard = Player[][] | null;

export type { Player, GameState, LeaveEventPayload, GameBoard };
