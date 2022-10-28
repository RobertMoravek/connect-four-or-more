<script setup lang="ts">
import { ref } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import StartMenu from "./components/StartMenu.vue";
import ConfigMenu from "./components/ConfigMenu.vue";
import GameBoard from "./components/GameBoard.vue";
import type { Player, GameState } from "../types";

const colCount = ref<number>(7);
const rowCount = ref<number>(6);
const winningSlots = ref<number>(4);
const player = ref<Player>(null);
const gameState = ref<GameState>("config");

// const toggle = (): void => {
//   newGame.value = !newGame.value;
// };
</script>

<template>
  <div id="container">
    <StartMenu
      @update-player="(p:Player) => player = p"
      v-if="player === null"
    />
    <ConfigMenu
      v-if="player !== null && gameState === 'config'"
      @update-gameState="(s:GameState) => gameState = s"
      v-model:col-count="colCount"
      v-model:row-count="rowCount"
      v-model:winning-slots="winningSlots"
    />
    <GameBoard
      v-if="player !== null && gameState === 'ready'"
      :row-count="rowCount"
      :col-count="colCount"
      :player="player"
    />
  </div>
  <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView /> -->
</template>

<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
