export type gameObject = {
    gameBoard: [1 | 2 | null][][];
    playerName?: [string, string];
    playerTurn: 1 | 2 | null;
    score: [number, number];
    gameState: "config" | "ready" | "running" | "end" | "closed";
    winner: null | 1 | 2;
    config: [number, number, number];
    sockets: [string, string];
    lastMove: [number, number, 1 | 2];
    winningSlots: [number, number][];
    error: boolean;
    errorMessage: string;
};

export type activeGames = {
    [key:string]: gameObject
} | null;

