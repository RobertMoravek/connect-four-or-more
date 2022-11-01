<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../types";
const props = defineProps<{
  slotSize: number;
  player: Player;
  idx: number;
  pieceValue: Player;
}>();

const holeSize = computed<number>(() => (props.slotSize * 5) / 7);
const pieceColor = computed<string>(() =>
  props.pieceValue === 1
    ? "tomato"
    : props.pieceValue === 2
    ? "gold"
    : "transparent"
);
</script>

<template>
  <div class="piece" :idx="idx"></div>
</template>

<style scoped>
/* .slot {
  width: 7vw;
  aspect-ratio: 1/1; */
/* height: 7vw; */
/*center the hole in the middle of the square*/
/* display: flex;
  justify-content: center;
  align-items: center; */
/*hide the huge border of the hole*/
/* overflow: hidden; */
/* margin: 3px; */
/* } */

.piece {
  width: v-bind(holeSize + "px");
  /* height: 5vw; */
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(pieceColor);
  z-index: -1;
  /*set a big border on the transparent hole*/
  /* box-shadow: 0 0 0 100vh blue; */
  /* border: 5vw solid royalblue; */
  /*don't allow the hole to shrink to the container*/
  /* flex-shrink: 0; */
  /* transform-style: preserve-3d; */
  /* overflow: hidden; */
  /* z-index: 100;
    position: absolute;
    background: transparent; */
}
</style>
