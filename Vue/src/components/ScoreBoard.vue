<script setup lang="ts">
import GamePiece from "./GamePiece.vue";
import type { Player } from "../../types";
const props = defineProps<{
  player: Player;
  score: [number, number];
  playerTurn: Player;
}>();
</script>

<template>
  <div id="score-container">
    <div class="player">
      <div
        class="playerColorIndicator redOutline"
        :class="{ redFilling: playerTurn === 1 }"
      ></div>
      <h3 :class="{ underline: props.player == 1 }">Player 1</h3>
    </div>
    <h3 class="score">{{ props.score[0] }} : {{ props.score[1] }}</h3>
    <div class="player player2">
      <h3 :class="{ underline: props.player == 2 }">Player 2</h3>
      <div
        class="playerColorIndicator yellowOutline"
        :class="{ yellowFilling: playerTurn === 2 }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
#score-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.score {
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: 3px solid var(--color-text);
  padding: 0.25rem 0.5rem;
}

.underline {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.playerColorIndicator {
  width: 1.5rem;
  min-width: 1.5rem;
  height: 1.5rem;
  min-height: 1.5rem;
  border: 5px solid;
  border-radius: 50%;
  box-shadow: inset 3px 3px 6px #212121, 3px 3px 6px #212121;
  z-index: 10;
}

.playerTurnIndicator {
  border-radius: 50%;
  z-index: 1;
}

.redOutline {
  border-color: crimson;
}
.yellowOutline {
  border-color: gold;
}

.redFilling {
  background-color: crimson;
}
.yellowFilling {
  background-color: gold;
}

.player {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: 170px;
}

.player2{
  justify-content: flex-start;
}

@media screen and (max-width: 500px) {
  #score-container {
    flex-direction: column;
  }
  .score {
    justify-self: flex-start;
    order: 2;
  }
  .player {
    font-size: 1rem;
    justify-content: flex-start;
    align-items: center;
  }
  .playerColorIndicator {
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    min-height: 1rem;
    border-width: 3px;
  }
  .player2 {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
}
</style>
