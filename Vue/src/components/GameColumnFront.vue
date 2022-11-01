<script setup lang="ts">
import { ref, computed } from "vue";
import type { Player } from "../../types";

const props = defineProps<{
  rowCount: number[];
  slotSize: number;
  player: Player;
}>();

const holeSize = computed<number>(() => Math.ceil((props.slotSize * 5) / 7));
</script>

<template>
  <div class="column">
    <div
      v-for="row in rowCount"
      :key="row"
      :idx="row"
      :class="'slot row-' + row"
    >
      <div class="hole"></div>
    </div>
  </div>
</template>

<style scoped>
.slot {
  width: v-bind(slotSize + "px");
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hole {
  width: v-bind(holeSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  /*set a big border on the transparent hole*/
  /* box-shadow: 0 0 0 100vh blue; */
  border: v-bind(holeSize + "px") solid royalblue;
  /*don't allow the hole to shrink to the container*/
  flex-shrink: 0;
  /* transform-style: preserve-3d; */
  overflow: hidden;
  /* z-index: 100;
    position: absolute;
    background: transparent; */
}
</style>
