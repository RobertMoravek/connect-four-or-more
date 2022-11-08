<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../types";
const props = defineProps<{
  pieceSize: number;
  player: Player;
  idx: number;
  pieceValue: Player;
}>();

const pieceColor = computed<string>(() =>
  props.pieceValue === 1
    ? "crimson"
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
  width: v-bind(pieceSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(pieceColor);
  z-index: -5;

}
</style>
