<script setup lang="ts">
import type { Player } from "../../types";

const props = defineProps<{
  rowCount: number;
  // slots: number;
  player: Player;
}>();

//renumber the rows from 0
const renumberRows = (param: number): number[] => {
  return [...Array(param).keys()];
};
const updatedRowCount = renumberRows(props.rowCount);
</script>

<template>
  <div class="column">
    <div
      v-for="row in updatedRowCount"
      :key="row"
      :idx="row"
      :class="'slot row-' + row"
    >
      <div class="hole">
        <!-- <GameSlot
        v-for="slot in slots"
        :key="slot"
        :current-player="currentPlayer"
      /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.slot {
  width: 7vw;
  aspect-ratio: 1/1;
  /* height: 7vw; */
  /*center the hole in the middle of the square*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*hide the huge border of the hole*/
  overflow: hidden;
  /* margin: 3px; */
}

.hole {
  width: 5vw;
  aspect-ratio: 1/1;
  /* height: 5vw; */
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
</style>
