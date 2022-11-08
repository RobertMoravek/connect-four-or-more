<script setup lang="ts">
import { inject } from "vue";
import type {
  Player,
  GameBoard,
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
}>();

const emit = defineEmits<{
  (e: "leave-game"): void;
}>();

const renumber = (param: number): number[] => {
  return [...Array(param).keys()];
};
const updatedRowCount = renumber(props.rowCount).reverse();
const updatedColCount = renumber(props.colCount);
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
    />
    <button @click="handleLeaveGameClick">Leave game</button>
  </div>
</template>

<style scoped>
#game-screen-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
}
</style>
