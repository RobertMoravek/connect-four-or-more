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

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const lastMove = ref<LastMove>(null);
const winningSlots = ref<WinningSlots>(null);

const props = defineProps<{
  colCount: number[];
  rowCount: number[];
  slotSize: number;
  player: Player;
  code: string;
  gameBoard: GameBoard;
  playerTurn: Player;
}>();

socket.on("game-update", (gameObject: GameObject, gameCode?: string) => {
  lastMove.value = gameObject.lastMove;
  winningSlots.value = gameObject.winningSlots;
});

const heightBack = computed<number>(
  () => props.slotSize * (props.rowCount.length + 1)
);
</script>

<template>
  <div id="game">
    <GameColumnFront
      v-for="column in props.colCount"
      :key="column"
      :idx="column"
      :row-count="props.rowCount"
      :player="props.player"
      :slot-size="slotSize"
    />
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
  display: flex;
  height: v-bind(heightBack + "px");
  align-items: flex-end;
  /* border: 2px solid transparent; */
  /* border-radius: 8px; */
  overflow: hidden;
  position: relative;
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
  bottom: 0;
  /* top: 0;
  right: 0; */
}
</style>
