<script setup lang="ts">
import { computed } from "vue";
import type { Player, GameBoard } from "../../types";
import GameColumnFront from "./GameColumnFront.vue";
import GameColumnBack from "./GameColumnBack.vue";

const gameBoard: GameBoard = [
  [1, 2, null, null, null, null],
  [2, 1, 1, null, null, null],
  [2, null, null, null, null, null],
  [null, null, null, null, null, null],
  [1, 2, 1, 2, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  player: Player;
}>();

const heightBack = computed<number>(
  () => props.slotSize * (props.rowCount.length + 1)
);
</script>

<template>
  <div id="game">
    <GameColumnFront
      v-for="column in props.colCount"
      :key="column"
      :idx="column"
      :row-count="props.rowCount"
      :player="props.player"
      :slot-size="slotSize"
    />
    <div id="game-back">
      <GameColumnBack
        v-for="column in props.colCount"
        :key="column"
        :index="column"
        :slot-config="gameBoard[column].reverse()"
        :col-count="props.colCount"
        :row-count="props.rowCount"
        :player="props.player"
        :slot-size="slotSize"
      />
    </div>
  </div>
</template>

<style scoped>
#game {
  display: flex;
  margin: auto;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

#game-back {
  display: flex;
  height: v-bind(heightBack + "px");
  margin: auto;
  /* border: 2px solid transparent; */
  border-radius: 4%;
  overflow: hidden;
  position: absolute;
  bottom: 0;
}
</style>
