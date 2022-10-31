<script setup lang="ts">
import { ref, computed } from "vue";
import GamePiece from "./GamePiece.vue";
import type { Player } from "../../types";

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  // slots: number;
  player: Player;
}>();

const hover = ref<boolean>(false);

const holeSize = computed<number>(() => (props.slotSize * 5) / 7);
const previewColor = computed<string>(() =>
  props.player === 1 ? "tomato" : props.player === 2 ? "yellow " : ""
);

const rowCountBack: number[] = [props.rowCount.length, ...props.rowCount];
console.log("row count back", rowCountBack);

const nbRows = computed<number>(() => props.rowCount.length + 1);
</script>

<template>
  <div
    class="column-back"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <!-- <GamePiece
      v-for="row in rowCountBack"
      :key="row"
      :idx="row"
      :player="props.player"
      :slot-size="slotSize"
    /> -->
    <GamePiece
      v-for="row in rowCountBack"
      :key="row"
      :idx="row"
      :player="props.player"
      :slot-size="slotSize"
    />
  </div>
</template>

<style scoped>
.column-back {
  display: grid;
  grid-template-columns: v-bind(slotSize + "px");
  grid-template-rows: repeat(v-bind(nbRows), v-bind(slotSize + "px"));
  align-items: center;
  justify-items: center;
}
/* .slot-back {
  height: v-bind(slotSize + "px");
  /* aspect-ratio: 1/1;
  /* height: 7vw; */
/*center the hole in the middle of the square*/
/* display: flex;
  justify-content: center;
  align-items: center; */
/*hide the huge border of the hole*/
/* overflow: hidden; */
/* margin: 3px; */
/* } */

.hole {
  width: v-bind(holeSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  /*set a big border on the transparent hole*/
  /* box-shadow: 0 0 0 100vh blue; */
  border: 5vw solid royalblue;
  /*don't allow the hole to shrink to the container*/
  flex-shrink: 0;
  transform-style: preserve-3d;
  overflow: hidden;
  /* z-index: 100;
    position: absolute;
    background: transparent; */
}

.active {
  background-color: v-bind(previewColor);
}
</style>
