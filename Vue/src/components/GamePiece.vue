<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../types";
const props = defineProps<{
  pieceSize: number;
  player: Player;
  idx: number;
  pieceValue: Player;
  isWinningSlot: boolean;
}>();

const pieceColor = computed<string>(() =>
  props.pieceValue === 1
    ? "crimson"
    : props.pieceValue === 2
    ? "gold"
    : "transparent"
);

const pieceEdgeColor = computed<string>(() =>
  props.pieceValue === 1
    ? "#8d0d26"
    : props.pieceValue === 2
    ? "#a38a00"
    : "transparent"
);

// const piecePosition = computed<number>(() => props.idx + 1);
</script>

<template>
  <div :class="isWinningSlot ? 'piece win' : 'piece'" :idx="idx"></div>
</template>

<style scoped>
.piece {
  width: v-bind(pieceSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(pieceColor);
  z-index: -5;
  box-shadow: inset -3px -3px 6px #212121;
  border: 5px solid v-bind(pieceColor);
}

.win {
  background: radial-gradient(v-bind(pieceColor), v-bind(pieceEdgeColor));
  animation: rotate 3s ease-out;
  border: 4px solid v-bind(pieceEdgeColor);
  transform-style: preserve-3d;
  box-shadow: none;
}
@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(1800deg);
  }
}
</style>
