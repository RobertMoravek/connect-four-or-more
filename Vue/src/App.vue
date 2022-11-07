<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import StartMenu from "./components/StartMenu.vue";
import ConfigMenu from "./components/ConfigMenu.vue";
import GameScreen from "./components/GameScreen.vue";
import ResultsView from "./components/ResultsView.vue";
import type { Player, GameState, LeaveEventPayload, LastMove } from "../types";
import { io } from "socket.io-client";
import throttle from "lodash/throttle";

//TO DO render startMenu conditionally based on gameObject = null

const socket = io();

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

const slotSize = computed<number>(() =>
  Math.floor(
    Math.min(
      (windowHeight.value * 0.7) / rowCount.value,
      (windowWidth.value * 0.8) / colCount.value
    )
  )
);

const emit = (): void => {
  socket.emit("new-game");
};
// const toggle = (): void => {
//   newGame.value = !newGame.value;
// };
</script>

<template>
  <div id="container">
    <!-- <button @click="emit">Emit to BE</button> -->

    <StartMenu
      @update-player="(p:Player) => player = p"
      v-if="player === null && gameState === 'config'"
      :window-height="windowHeight"
      :key="1"
    />
    <ConfigMenu
      v-if="player !== null && gameState === 'config'"
      @update-gameState="(s:GameState) => gameState = s"
      v-model:col-count="colCount"
      v-model:row-count="rowCount"
      v-model:winning-slots="winningSlots"
      :key="2"
    />
    <GameScreen
      v-if="player !== null && gameState === 'ready'"
      :row-count="rowCount"
      :col-count="colCount"
      :player="player"
      :slot-size="slotSize"
      :key="3"
    />
  </div>
  <div class="modal" v-if="player === null && gameState === 'end'">
    <ResultsView
      @leave-game="(p:LeaveEventPayload) => ({player, gameState} = p)"
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

.fall-enter-active {
  animation: bounce 0.7s ease-in;
}
.fall-leave-active {
  animation: bounce 0.7s ease-in reverse;
}

@keyframes bounce {
  0% {
    transform: translateY(v-bind(-windowHeight + "px"));
  }
  40% {
    transform: translateY(v-bind(-windowHeight * 0.3 + "px"));
  }
  65% {
    transform: translateY(v-bind(-windowHeight * 0.15 + "px"));
  }
  82% {
    transform: translateY(v-bind(-windowHeight * 0.075 + "px"));
  }
  92% {
    transform: translateY(v-bind(-windowHeight * 0.0335 + "px"));
  }
  55%,
  75%,
  87%,
  97%,
  100% {
    transform: translateY(0px);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
