<script setup lang="ts">
import { computed } from "vue";
import type { Player } from "../../types";
const props = defineProps<{
  pieceSize: number;
  player: Player;
  row: number;
  rowCount: number[];
  slotSize: number;
}>();

const pieceColor = computed<string>(() =>
  props.player === 1 ? "crimson" : props.player === 2 ? "gold" : ""
);

const startPosAnimation = computed<number>(
  () => (props.rowCount[0] - props.row + 1) * props.slotSize
);
</script>

<template>
  <div class="falling-piece"></div>
</template>

<style scoped>
.falling-piece {
  width: v-bind(pieceSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: v-bind(pieceColor);
}

.fall-enter-active {
  animation: bounce 0.7s ease-in;
}

@keyframes bounce {
  0% {
    transform: translateY(v-bind(startPosAnimation + "px"));
  }
  40% {
    transform: translateY(v-bind(startPosAnimation * 0.3 + "px"));
  }
  65% {
    transform: translateY(v-bind(startPosAnimation * 0.15 + "px"));
  }
  82% {
    transform: translateY(v-bind(startPosAnimation * 0.075 + "px"));
  }
  92% {
    transform: translateY(v-bind(startPosAnimation * 0.0335 + "px"));
  }
  55%,
  75%,
  87%,
  97%,
  100% {
    transform: translateY(0px);
  }
}
</style>
