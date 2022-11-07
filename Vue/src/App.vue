<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, computed } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import StartMenu from "./components/StartMenu.vue";
import ConfigMenu from "./components/ConfigMenu.vue";
import GameScreen from "./components/GameScreen.vue";
import ResultsView from "./components/ResultsView.vue";
import type {
  Player,
  GameState,
  LeaveEventPayload,
  LastMove,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types";
import throttle from "lodash/throttle";
import type { Socket } from "socket.io-client";

//TO DO: wait screen

// import socket
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

//variable for conditional rendering of startMenu
const inGame = ref<boolean>(false);

//get window size dynamically & with throttle
let windowWidth = ref<number>(window.innerWidth);
let windowHeight = ref<number>(window.innerHeight);
const useWindowSize = (): void => {
  windowHeight.value = window.innerHeight;
  windowWidth.value = window.innerWidth;
};

const useWindowSizeThrottled = throttle(useWindowSize, 200);

onMounted(() => window.addEventListener("resize", useWindowSizeThrottled));
onUnmounted(() => window.removeEventListener("resize", useWindowSizeThrottled));

const colCount = ref<number>(7);
const rowCount = ref<number>(6);
const winningSlots = ref<number>(4);
const player = ref<Player>(null);
const gameState = ref<GameState>("config");
const code = ref<string>("");

const slotSize = computed<number>(() =>
  Math.floor(
    Math.min(
      (windowHeight.value * 0.7) / rowCount.value,
      (windowWidth.value * 0.8) / colCount.value
    )
  )
);
// const toggle = (): void => {
//   newGame.value = !newGame.value;
// };

socket.on("game-update", () => {});
</script>

<template>
  <div id="container">
    <StartMenu
      @update-player="(p:Player) => {player = p; inGame=true}"
      v-if="inGame === false"
    />
    <ConfigMenu
      v-if="player === 1 && gameState === 'config'"
      @update-gameState="(s:GameState) => gameState = s"
      :code="code"
    />
    <GameScreen
      v-if="player !== null && gameState === 'ready'"
      :row-count="rowCount"
      :col-count="colCount"
      :player="player"
      :slot-size="slotSize"
      :code="code"
    />
  </div>
  <div class="modal" v-if="player === null && gameState === 'end'">
    <ResultsView
      @leave-game="(p:LeaveEventPayload) => ({player, gameState} = p)"
      :code="code"
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  inset: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10vh;
  /* transform: translateY(-100%); */
}
</style>
