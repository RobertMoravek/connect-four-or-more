export type GameObject = {
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
};

export type Player = 1 | 2 | null;

export type ActiveGames = {
    [key:string]: GameObject
};

