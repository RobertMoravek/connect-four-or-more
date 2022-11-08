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

}
.win {
  animation: rotate 3s ease-out;
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
