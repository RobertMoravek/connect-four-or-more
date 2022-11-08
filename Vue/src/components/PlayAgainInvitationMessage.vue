<script setup lang="ts">
import type { Player, GameState } from "../../types";

const props = defineProps<{
  player: Player;
  gameState: GameState;
  playAgain: boolean[];
}>();
</script>

<template>
  <p
    v-if="
      props.gameState !== 'closed' &&
      ((props.player === 1 && props.playAgain[1] === true) ||
        (props.player === 2 && props.playAgain[0] === true))
    "
    id="new-game-invite"
  >
    The other player invited you to a new game
  </p>
  <p
    v-if="
      props.gameState !== 'closed' &&
      ((props.player === 1 && props.playAgain[0] === true) ||
        (props.player === 2 && props.playAgain[1] === true))
    "
    id="new-game-invite"
  >
    Waiting for the other player...
  </p>
</template>

<style scoped>
#new-game-invite {
  position: fixed;
  top: 10px;
  text-align: center;
  background-color: gold;
  animation: bounce 0.7s ease-in;
  padding: 0 1vw;
  border: 2px solid #2c3e50;
  border-radius: 5px;
}

@keyframes bounce {
  0% {
    transform: translateY(-8px);
  }
  40% {
    transform: translateY(-6px);
  }
  65% {
    transform: translateY(-4px);
  }
  82% {
    transform: translateY(-2px);
  }
  92% {
    transform: translateY(-1px);
  }
  55%,
  75%,
  87%,
  97%,
  100% {
    transform: translateY(0px);
  }
}
</style>
