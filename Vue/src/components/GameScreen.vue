<script setup lang="ts">
import { inject, computed } from "vue";
import type {
  Player,
  GameBoard,
  LastMove,
  WinningSlots,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";
import GameBoardVue from "./GameBoard.vue";
import ScoreBoard from "./ScoreBoard.vue";
import type { Socket } from "socket.io-client";
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const props = defineProps<{
  colCount: number;
  rowCount: number;
  slotSize: number;
  player: Player;
  code: string;
  gameBoard: GameBoard;
  playerTurn: Player;
  lastMove: LastMove;
  winningSlots: WinningSlots;
}>();

const emit = defineEmits<{
  (e: "leave-game"): void;
}>();

const renumber = (param: number): number[] => {
  return [...Array(param).keys()];
};
const updatedRowCount = computed<number[]>(() =>
  renumber(props.rowCount).reverse()
);
const updatedColCount = computed<number[]>(() => renumber(props.colCount));
const handleLeaveGameClick = (): void => {
  socket.emit("leave-game");
  emit("leave-game");
};
</script>

<template>
  <div id="game-screen-container">
    <ScoreBoard />
    <GameBoardVue
      :row-count="updatedRowCount"
      :col-count="updatedColCount"
      :player="player"
      :slot-size="slotSize"
      :game-board="gameBoard"
      :code="code"
      :player-turn="playerTurn"
      :last-move="lastMove"
      :winning-slots="winningSlots"
    />
    <button @click="handleLeaveGameClick">Leave game</button>
  </div>
</template>

<style scoped>
#game-screen-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2vh;
  max-width: 100%;
  max-height: 100%;
}
</style>
