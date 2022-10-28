type Player = 1 | 2 | null;
type GameState = "config" | "ready" | "run" | "end" | "closed";

interface LeaveEventPayload {
  player: Player;
  gameState: GameState;
}

export type { Player, GameState, LeaveEventPayload };
