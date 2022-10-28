<script setup lang="ts">
import type { Player } from "../../types";
import GameColumnFront from "./GameColumnFront.vue";

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  player: Player;
}>();
console.log("slot size", props.slotSize);
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
  </div>
</template>

<style scoped>
#game {
  display: flex;
  margin: auto;
  border: 2px solid transparent;
  border-radius: 4%;
  overflow: hidden;
}
</style>
