<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../types";
const props = defineProps<{
  pieceSize: number;
  player: Player;
  hover: boolean;
}>();

const previewColor = computed<string>(() =>
  props.player === 1 ? "tomato" : props.player === 2 ? "goldenrod" : ""
);
</script>

<template>
  <div class="piece-preview"></div>
</template>

<style scoped>
.piece-preview {
  width: v-bind(pieceSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(previewColor);
  z-index: -1;
  opacity: 0.5;
}
</style>
