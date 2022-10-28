<script setup lang="ts">
import type { Player } from "../../types";
import GameColumnFront from "./GameColumnFront.vue";
import GameColumnBack from "./GameColumnBack.vue";

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  player: Player;
}>();
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
        :idx="column"
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
  border-radius: 4%;
  overflow: hidden;
  position: relative;
}

#game-back {
  display: flex;
  margin: auto;
  border: 2px solid transparent;
  border-radius: 4%;
  overflow: hidden;
  position: absolute;
}
</style>
