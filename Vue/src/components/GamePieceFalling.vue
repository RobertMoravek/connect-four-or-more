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
  props.player === 1 ? "tomato" : props.player === 2 ? "goldenrod" : ""
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
  animation: bounce 1s ease-in;
}

@keyframes bounce {
  0% {
    transform: translateY(v-bind(startPosAnimation + "px"));
  }
  40% {
    transform: translateY(v-bind(startPosAnimation * 0.5 + "px"));
  }
  65% {
    transform: translateY(v-bind(startPosAnimation * 0.25 + "px"));
  }
  82% {
    transform: translateY(v-bind(startPosAnimation * 0.125 + "px"));
  }
  92% {
    transform: translateY(v-bind(startPosAnimation * 0.06 + "px"));
  }
  55%,
  75%,
  87%,
  97%,
  100% {
    transform: translate3d(0%, 0%, 0);
  }
}
</style>
