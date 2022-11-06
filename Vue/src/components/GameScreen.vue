<script setup lang="ts">
import { inject } from "vue";
import type {
  Player,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";
import GameBoard from "./GameBoard.vue";
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
}>();

const renumber = (param: number): number[] => {
  return [...Array(param).keys()];
};
const updatedRowCount = renumber(props.rowCount).reverse();
const updatedColCount = renumber(props.colCount);
const emit = (): void => {
  socket.emit("new-game");
};
</script>

<template>
  <div id="game-screen-container">
    <ScoreBoard />
    <GameBoard
      :row-count="updatedRowCount"
      :col-count="updatedColCount"
      :player="player"
      :slot-size="slotSize"
    />
    <button @click="emit">Emit to BE</button>
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
