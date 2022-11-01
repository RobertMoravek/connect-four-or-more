<script setup lang="ts">
import { ref, computed } from "vue";
import GamePiece from "./GamePiece.vue";
import GamePiecePreview from "./GamePiecePreview.vue";
import type { Player } from "../../types";

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  slotConfig: Player[];
  player: Player;
}>();

const hover = ref<boolean>(false);

// const slotConfigExtraRow = computed<Player[]>(() => [
//   ...props.slotConfig,
//   null,
// ]);
// const nextFreeSlot = computed<number>(() =>
//   slotConfigExtraRow.value.slice(0, -1).indexOf(null)
// );

const pieceSize = computed<number>(
  () => Math.ceil((props.slotSize * 5) / 7) + 1
);
const existingSlots = computed<Player[]>(() =>
  props.slotConfig.filter((i) => i !== null)
);

const nbRows = computed<number>(() => props.rowCount.length + 1);

// const existingSlotsWithPreview = computed<Player[]>(() =>
//   existingSlots.value.length == props.rowCount.length
//     ? existingSlots.value
//     : [...existingSlots.value, null]
// );
</script>

<template>
  <div
    class="column-back"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <GamePiece
      v-for="(slot, index) in existingSlots"
      :key="index"
      :idx="index"
      :player="props.player"
      :piece-size="pieceSize"
      :piece-value="slot"
    />
    <GamePiecePreview
      v-if="hover && existingSlots.length < nbRows - 1"
      :player="props.player"
      :piece-size="pieceSize"
      :hover="hover"
    />
  </div>
</template>

<style scoped>
.column-back {
  display: grid;
  transform: rotate(180deg);
  transform-origin: center;
  grid-template-columns: v-bind(slotSize + "px");
  grid-template-rows: repeat(v-bind(nbRows), v-bind(slotSize + "px"));
  align-items: center;
  justify-items: center;
}
/* .active {
  background-color: v-bind(previewColor);
  opacity: 0.5;
} */
</style>
