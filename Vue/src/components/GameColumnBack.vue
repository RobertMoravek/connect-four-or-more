<script setup lang="ts">
import { ref, computed, inject, toRefs } from "vue";
import type { Socket } from "socket.io-client";
import GamePiece from "./GamePiece.vue";
import GamePiecePreview from "./GamePiecePreview.vue";
import GamePieceFalling from "./GamePieceFalling.vue";
import type {
  Player,
  LastMove,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  slotConfig: Player[];
  player: Player;
  lastMove: LastMove;
  playerTurn: Player;
  colIndex: number;
  code: string;
}>();

// const emit = defineEmits<{ (e: "add-piece", p: LastMove): void }>();
console.log("last move", props.lastMove);
console.log("colIndex", props.colIndex);
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

// const finalMove: LastMove = toRefs(props.lastMove);
// const showFallingPiece = computed<boolean>(
//   () => lastMove.value !== null && props.colIndex == lastMove.value[0]
// );
// console.log("show falling piece", showFallingPiece.value);
// const fallingPieceKey = computed<number>(() => lastMove.value![1]);
// const fallingPieceRow = computed<number>(() => lastMove.value![1]);
// const fallingPiecePlayer = computed<Player>(() => lastMove.value![2]);
// :key="props.lastMove[1]"
// :row="props.lastMove[1]"
// :player="props.lastMove[2]"

const handleColumnClick = (e: Event): void => {
  if (props.player !== props.playerTurn) {
    e.preventDefault();
    return;
  }
  if (nextFreeSlot.value == null) {
    e.preventDefault();
  } else {
    // emit("add-piece", [props.colIndex, nextFreeSlot.value, props.player!]);
    socket.emit("column-click", props.colIndex, props.player!, props.code);
  }
};
</script>

<template>
  <div
    class="column-back"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="handleColumnClick"
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
          v-if="lastMove !== null && colIndex == lastMove[0]"
          :key="lastMove[1]"
          :row="lastMove[1]"
          :player="lastMove[2]"
          :piece-size="pieceSize"
          :row-count="rowCount"
          :slot-size="slotSize"
        />
      </Transition>
      <GamePiecePreview
        v-if="
          hover &&
          existingSlots.length < rowCount.length &&
          props.player === props.playerTurn
        "
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
