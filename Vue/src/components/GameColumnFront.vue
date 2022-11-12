<script setup lang="ts">
import { computed } from "vue";
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
  border: v-bind(holeSize + "px") solid royalblue;
  flex-shrink: 0;
  overflow: hidden;
  filter: drop-shadow(3px 3px 3px #212121);
}
</style>
