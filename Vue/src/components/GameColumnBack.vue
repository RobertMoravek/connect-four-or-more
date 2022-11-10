<script setup lang="ts">
import { ref, computed, inject } from "vue";
import type { Socket } from "socket.io-client";
import GamePiece from "./GamePiece.vue";
import GamePiecePreview from "./GamePiecePreview.vue";
import GamePieceFalling from "./GamePieceFalling.vue";
import type {
  Player,
  LastMove,
  WinningSlots,
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
  winningSlots: WinningSlots;
}>();

const hover = ref<boolean>(false);

const pieceSize = computed<number>(
  () => Math.ceil((props.slotSize * 5) / 7) - 9
);
const existingSlots = computed<Player[]>(() =>
  props.slotConfig.filter((i) => i !== null)
);

const nbRows = computed<number>(() => props.rowCount.length);

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

const winningSlotsinColumn = computed<number[]>(() =>
  props.winningSlots !== null
    ? props.winningSlots
        .filter((i) => i[0] === props.colIndex)
        .map((el) => el[1])
    : []
);

// const isWinningSlot = computed<boolean>(() => existingSlots.filter((i, index) => index === winningSlotsinColumn. ? "true" : "false" ));

const handleColumnClick = (e: Event): void => {
  if (props.player !== props.playerTurn) {
    e.preventDefault();
    return;
  }
  if (nextFreeSlot.value == null) {
    e.preventDefault();
  } else {
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
        :is-winning-slot="winningSlotsinColumn.includes(index)"
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
  grid-template-rows: repeat(v-bind(nbRows + 1), v-bind(slotSize + "px"));
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
