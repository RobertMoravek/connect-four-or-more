<script setup lang="ts">
import { computed } from "vue";
import GameColumnFront from "./GameColumnFront.vue";
import GameColumnBack from "./GameColumnBack.vue";
import type { Player, GameBoard, LastMove, WinningSlots } from "../../types";

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
  overflow: hidden;
  position: absolute;
  border: 5px outset transparent;
  bottom: 0;
}
</style>
