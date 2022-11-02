<script setup lang="ts">
import { ref, computed } from "vue";
import GamePiece from "./GamePiece.vue";
import GamePiecePreview from "./GamePiecePreview.vue";
import GamePieceFalling from "./GamePieceFalling.vue";
import type { Player, LastMove } from "../../types";

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  slotConfig: Player[];
  player: Player;
  lastMove: LastMove;
  index: number;
}>();

const emit = defineEmits<{ (e: "add-piece", p: LastMove): void }>();

const hover = ref<boolean>(false);

const pieceSize = computed<number>(
  () => Math.ceil((props.slotSize * 5) / 7) + 1
);
const existingSlots = computed<Player[]>(() =>
  props.slotConfig.filter((i) => i !== null)
);
const nbRows = computed<number>(() => props.rowCount.length + 1);
const nextFreeSlot = computed<number | null>(() => {
  if (
    existingSlots.value.length > 0 &&
    existingSlots.value.length < props.rowCount.length
  ) {
    return existingSlots.value.length;
  } else if (existingSlots.value.length === 0) {
    return 0;
  } else {
    return null;
  }
});

const addSlot = (e: Event): void => {
  if (nextFreeSlot.value == null) {
    e.preventDefault();
  } else {
    emit("add-piece", [props.index, nextFreeSlot.value, props.player!]);
  }
};
</script>

<template>
  <div
    class="column-back"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="addSlot"
  >
    <div class="pieces-container">
      <GamePiece
        v-for="(slot, index) in existingSlots"
        :key="index"
        :idx="index"
        :player="props.player"
        :piece-size="pieceSize"
        :piece-value="slot"
      />
      <Transition name="fall">
        <GamePieceFalling
          v-if="lastMove !== null && index == lastMove[0]"
          :key="lastMove[1]"
          :row="lastMove[1]"
          :player="lastMove[2]"
          :piece-size="pieceSize"
          :row-count="rowCount"
          :slot-size="slotSize"
        />
      </Transition>
      <GamePiecePreview
        v-if="hover && existingSlots.length < rowCount.length"
        :player="props.player"
        :piece-size="pieceSize"
        :hover="hover"
      />
    </div>
  </div>
</template>

<style scoped>
.column-back {
  display: grid;
  grid-template-columns: v-bind(slotSize + "px");
  grid-template-rows: repeat(v-bind(nbRows), v-bind(slotSize + "px"));
  align-items: center;
  justify-items: center;
  position: relative;
}

.pieces-container {
  display: grid;
  transform: rotate(180deg);
  transform-origin: center;
  grid-template-columns: v-bind(slotSize + "px");
  grid-template-rows: repeat(v-bind(nbRows), v-bind(slotSize + "px"));
  align-items: center;
  justify-items: center;
  position: absolute;
  z-index: -1;
}
/* .active {
  background-color: v-bind(previewColor);
  opacity: 0.5;
} */
</style>
