<script setup lang="ts">
import type { Player } from "../../types";
import GameColumn from "./GameColumn.vue";

const props = defineProps<{
  colCount: number;
  rowCount: number;
  player: Player;
}>();
</script>

<template>
  <div id="game">
    <GameColumn
      v-for="column in props.colCount"
      :key="column"
      :idx="column"
      :row-count="props.rowCount"
      :player="props.player"
    />
  </div>
</template>

<style scoped>
#game {
  display: flex;
  margin: auto;
  /* styling for round game border */
  /* border: 2px solid royalblue;
    border-radius: 5%;
    overflow: hidden; */
}
</style>
