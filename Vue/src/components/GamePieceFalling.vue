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
const borderSize = computed<number>(() => props.pieceSize / 6);
const piecePosition = computed<number>(() => props.row + 1);
const durationAnimation = computed<number>(
  () => (props.rowCount[0] - props.row + 1) * 0.07
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
  grid-row: v-bind(piecePosition);
  background-color: v-bind(pieceColor);
  z-index: -8;
  box-shadow: inset -3px -3px 6px #212121;
  border: v-bind(borderSize + "px") solid v-bind(pieceColor);
}

.fall-enter-active {
  animation-name: fall, bounce;
  animation-duration: v-bind(durationAnimation + "s"), 0.4s;
  animation-delay: 0s, v-bind(durationAnimation + "s");
  animation-timing-function: ease-in;
}

@keyframes fall {
  0% {
    transform: translateY(v-bind(startPosAnimation + "px"));
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes bounce {
  30% {
    transform: translateY(v-bind(startPosAnimation * 0.15 + "px"));
  }
  65% {
    transform: translateY(v-bind(startPosAnimation * 0.075 + "px"));
  }
  85% {
    transform: translateY(v-bind(startPosAnimation * 0.0335 + "px"));
  }
  91% {
    transform: translateY(v-bind(startPosAnimation * 0.0015 + "px"));
  }
  0%,
  50%,
  77%,
  96%,
  100% {
    transform: translateY(0px);
  }
}
</style>
