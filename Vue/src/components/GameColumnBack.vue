<script setup lang="ts">
import { ref, computed } from "vue";
import GamePiece from "./GamePiece.vue";
import type { Player } from "../../types";

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  slotConfig: Player[];
  player: Player;
}>();

const hover = ref<boolean>(false);
const previewColor = computed<string>(() =>
  props.player === 1 ? "tomato" : props.player === 2 ? "gold " : ""
);

const slotConfigExtraRow = computed<Player[]>(() => [
  null,
  ...props.slotConfig,
]);
const nextFreeSlot = computed<number>(() =>
  slotConfigExtraRow.value.lastIndexOf(null)
);

const nbRows = computed<number>(() => props.rowCount.length + 1);
</script>

<template>
  <div
    class="column-back"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <GamePiece
      v-for="(row, index) in slotConfigExtraRow"
      :key="index"
      :idx="slotConfigExtraRow.length - index"
      :player="props.player"
      :slot-size="slotSize"
      :piece-value="slotConfigExtraRow[index]"
      :class="hover && index !== 0 && nextFreeSlot === index && 'active'"
    />
  </div>
</template>

<style scoped>
.column-back {
  display: grid;
  grid-template-columns: v-bind(slotSize + "px");
  grid-template-rows: repeat(v-bind(nbRows), v-bind(slotSize + "px"));
  align-items: center;
  justify-items: center;
}
.active {
  background-color: v-bind(previewColor);
  opacity: 0.5;
}
</style>
