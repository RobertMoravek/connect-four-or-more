<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, computed } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import StartMenu from "./components/StartMenu.vue";
import ConfigMenu from "./components/ConfigMenu.vue";
import GameScreen from "./components/GameScreen.vue";
import ResultsView from "./components/ResultsView.vue";
import WaitScreen from "./components/WaitScreen.vue";
import type {
  Player,
  GameState,
  LeaveEventPayload,
  LastMove,
  GameBoard,
  GameObject,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../types";
import throttle from "lodash/throttle";
import type { Socket } from "socket.io-client";

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

const colCount = ref<number>(0);
const rowCount = ref<number>(0);
const winningSlots = ref<number>(0);
const player = ref<Player>(null);
const gameState = ref<GameState>("config");
const code = ref<string>("");
const playerTurn = ref<Player>(null);
const gameBoard = ref<GameBoard>(null);
const winner = ref<Player>(null);
const playAgain = ref<boolean[]>([false, false]);

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

socket.on("game-update", (gameObject: GameObject, gameCode?: string) => {
  console.log("game update event", gameObject);
  if (gameCode !== undefined) {
    code.value = gameCode;
  }
  colCount.value = gameObject.config[0];
  rowCount.value = gameObject.config[1];
  winningSlots.value = gameObject.config[2];
  if (gameObject.gameState === "end" && gameObject.winner !== null) {
    setTimeout(() => {
      gameState.value = gameObject.gameState;
    }, 1500);
  } else {
    gameState.value = gameObject.gameState;
  }
  playerTurn.value = gameObject.playerTurn;
  gameBoard.value = gameObject.gameBoard;
  winner.value = gameObject.winner;
  playAgain.value = gameObject.playAgain;
});
</script>

<template>
  <div id="container">

<Transition name="fall" type="animation" appear tag="div" mode="out-in">
    <StartMenu
      @update-player="(p:Player) => {player = p; inGame=true}"
      v-if="inGame === false"
    />
    <ConfigMenu
      v-if="player === 1 && gameState === 'config'"
      :code="code"
      :game-state="gameState"
      :play-again="playAgain"
    />
    <WaitScreen
      v-if="gameState === 'ready' || (player === 2 && gameState === 'config')"
    />
    <GameScreen
      v-if="player !== null && (gameState === 'running' || gameState === 'end')"
      :row-count="rowCount"
      :col-count="colCount"
      :player="player"
      :slot-size="slotSize"
      :player-turn="playerTurn"
      :game-board="gameBoard"
      :code="code"
    />
        </Transition>

  </div>
  <ResultsView
    v-if="gameState === 'end'"
    :winner="winner"
    :code="code"
    :player="player"
    :game-state="gameState"
    :play-again="playAgain"
  />
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

/* .modal {
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

  animation: bounce-in 0.7s ease-in;
}
.fall-leave-active {

  animation: fall-out 0.7s ease-in;
}


@keyframes bounce-in {
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
@keyframes fall-out {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(v-bind(windowHeight + "px"));
  }
}


</style>
