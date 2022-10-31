export type gameObject = {
    gameBoard: [1 | 2 | null][][] | null;
    playerName?: [string, string];
    playerTurn: 1 | 2 | null;
    score: [number, number];
    gameState: "config" | "ready" | "running" | "end" | "closed";
    winner: null | 1 | 2;
    config: [number, number, number];
    sockets: [string | null, string | null];
    lastMove: [number, number, 1 | 2] | null;
    winningSlots: [number, number][] | null;
    error: boolean;
    errorMessage?: string;
};

export type activeGames = {
    [key:string]: gameObject
} | null;

