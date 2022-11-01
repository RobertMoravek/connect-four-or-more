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
.piece {
  width: v-bind(holeSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(pieceColor);
  z-index: -1;
}
</style>
