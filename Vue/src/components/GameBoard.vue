<script setup lang="ts">
import { ref, computed, inject } from "vue";
import type {
  Player,
  GameBoard,
  LastMove,
  GameObject,
  WinningSlots,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";
import GameColumnFront from "./GameColumnFront.vue";
import GameColumnBack from "./GameColumnBack.vue";
import type { Socket } from "socket.io-client";

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
//   "socket"
// ) as Socket<ServerToClientEvents, ClientToServerEvents>;

// const lastMove = ref<LastMove>(null);
// const winningSlots = ref<WinningSlots>(null);

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  player: Player;
  code: string;
  gameBoard: GameBoard;
  playerTurn: Player;
  lastMove: LastMove;
  winningSlots: WinningSlots;
}>();

// socket.on("game-update", (gameObject: GameObject, gameCode?: string) => {
//   // lastMove.value = gameObject.lastMove;
//   winningSlots.value = gameObject.winningSlots;
// });

const heightFront = computed<number>(
  () => props.slotSize * props.rowCount.length
);

const heightBack = computed<number>(
  () => props.slotSize * (props.rowCount.length + 1)
);

const containerWidth = computed<number>(
  () => props.slotSize * props.colCount.length
);
</script>

<template>
  <div id="game">
    <div id="game-front">
      <GameColumnFront
        v-for="column in props.colCount"
        :key="column"
        :idx="column"
        :row-count="props.rowCount"
        :player="props.player"
        :slot-size="slotSize"
      />
    </div>
    <div id="game-back">
      <GameColumnBack
        v-for="column in props.colCount"
        :key="column"
        :col-index="column"
        :idx="column"
        :slot-config="props.gameBoard![column]"
        :col-count="props.colCount"
        :row-count="props.rowCount"
        :player="props.player"
        :slot-size="slotSize"
        :last-move="lastMove"
        :player-turn="playerTurn"
        :code="code"
        :winning-slots="winningSlots"
      />
    </div>
  </div>
</template>

<style scoped>
#game {
  height: v-bind(heightBack + "px");
  width: v-bind(containerWidth + "px");
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 5px outset transparent;
}

#game-front {
  display: flex;
  height: v-bind(heightFront + "px");
  align-items: flex-end;
  /* border: 2px solid transparent; */
  /* border-radius: 8px; */
  overflow: hidden;
  position: absolute;
  bottom: 0;
  border: 5px outset rgb(58, 96, 212);
  border-radius: 15px;
  box-shadow: 5px 5px 10px;
}

#game-back {
  display: flex;
  height: v-bind(heightBack + "px");
  /* border: 2px solid transparent; */
  /* border-radius: 4%; */
  overflow: hidden;
  position: absolute;
  border: 5px outset transparent;
  bottom: 0;
  /* top: 0;
  right: 0; */
}
</style>
