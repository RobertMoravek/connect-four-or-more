<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../types";
const props = defineProps<{
  pieceSize: number;
  player: Player;
  hover: boolean;
}>();

const previewColor = computed<string>(() =>
  props.player === 1 ? "crimson" : props.player === 2 ? "gold" : ""
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
  box-shadow: inset -3px -3px 6px #212121;
  border: 5px solid v-bind(previewColor);
}
</style>
