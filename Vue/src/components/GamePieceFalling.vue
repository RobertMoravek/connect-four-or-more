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

const previewColor = computed<string>(() =>
  props.player === 1 ? "tomato" : props.player === 2 ? "goldenrod" : ""
);

const pieceColor = computed<string>(() =>
  props.player === 1 ? "tomato" : props.player === 2 ? "goldenrod" : ""
);
console.log("row count", props.rowCount, props.row);
const startPosAnimation = computed<number>(
  () => (props.rowCount[0] - props.row + 1) * props.slotSize
);
console.log("start position", startPosAnimation.value);
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
    transform: translate3d(0%, v-bind(startPosAnimation + "px"), 0);
  }
  40% {
    transform: translate3d(0%, v-bind(startPosAnimation * 0.5 + "px"), 0);
  }
  65% {
    transform: translate3d(0%, v-bind(startPosAnimation * 0.25 + "px"), 0);
  }
  82% {
    transform: translate3d(0%, v-bind(startPosAnimation * 0.125 + "px"), 0);
  }
  92% {
    transform: translate3d(0%, v-bind(startPosAnimation * 0.06 + "px"), 0);
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
