<script setup lang="ts">
import type { Player } from "../../types";
import GameBoardFront from "./GameBoardFront.vue";
import ScoreBoard from "./ScoreBoard.vue";

const props = defineProps<{
  colCount: number;
  rowCount: number;
  slotSize: number;
  player: Player;
}>();

//renumber the rows & columns
const renumber = (param: number): number[] => {
  return [...Array(param).keys()];
};
const updatedRowCount = renumber(props.rowCount);
const updatedColCount = renumber(props.colCount);
</script>

<template>
  <div id="game-screen-container">
    <ScoreBoard />
    <GameBoardFront
      :row-count="updatedRowCount"
      :col-count="updatedColCount"
      :player="player"
      :slot-size="slotSize"
    />
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
