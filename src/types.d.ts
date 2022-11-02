export type gameObject = {
    gameBoard: player[][] | null;
    playerName?: [string, string];
    playerTurn: player;
    score: [number, number];
    gameState: "config" | "ready" | "running" | "end" | "closed";
    winner: player;
    config: [number, number, number];
    sockets: [string | null, string | null];
    lastMove: [number, 1 | 2] | null;
    winningSlots: [number, number][] | null;
};

export type player = 1 | 2 | null;

export type activeGames = {
    [key:string]: gameObject
};

