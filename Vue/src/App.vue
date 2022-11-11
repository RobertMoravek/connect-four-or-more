<script setup lang="ts">
import {
  inject,
  onMounted,
  onUnmounted,
  ref,
  computed,
  reactive,
  toRef,
} from "vue";
// import { RouterLink, RouterView } from "vue-router";
import StartMenu from "./components/StartMenu.vue";
import ConfigMenu from "./components/ConfigMenu.vue";
import GameScreen from "./components/GameScreen.vue";
import ResultsView from "./components/ResultsView.vue";
import WaitScreen from "./components/WaitScreen.vue";
import type {
  Player,
  GameObject,
  ServerToClientEvents,
  ClientToServerEvents,
  ErrorMessage,
} from "../types";
import throttle from "lodash/throttle";
import type { Socket } from "socket.io-client";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

let windowWidth = ref<number>(window.innerWidth);
let windowHeight = ref<number>(window.innerHeight);
const useWindowSize = (): void => {
  windowHeight.value = window.innerHeight;
  windowWidth.value = window.innerWidth;
};
const useWindowSizeThrottled = throttle(useWindowSize, 200);
onMounted(() => window.addEventListener("resize", useWindowSizeThrottled));
onUnmounted(() => window.removeEventListener("resize", useWindowSizeThrottled));

const inGame = ref<boolean>(false);
const game: GameObject = reactive({
  gameBoard: null,
  playerTurn: null,
  score: [0, 0],
  gameState: "config",
  winner: null,
  config: [0, 0, 0],
  sockets: [null, null],
  lastMove: null,
  winningSlots: null,
  playAgain: [false, false],
  playerStartedLast: null,
});

const resetGame: GameObject = {
  gameBoard: null,
  playerTurn: null,
  score: [0, 0],
  gameState: "config",
  winner: null,
  config: [0, 0, 0],
  sockets: [null, null],
  lastMove: null,
  winningSlots: null,
  playAgain: [false, false],
  playerStartedLast: null,
};

const player = ref<Player>(null);
const code = ref<string>("");
const config = toRef(game, "config");
const colCount = computed<number>(() => config.value[0]);
const rowCount = computed<number>(() => config.value[1]);
const winningComb = computed<number>(() => config.value[2]);
const slotSize = computed<number>(() =>
  Math.floor(
    Math.min(
      (windowHeight.value * 0.6) / rowCount.value,
      (windowWidth.value * 0.85) / colCount.value
    )
  )
);
const error = ref<string>("");

socket.on("game-update", (gameObject: GameObject, gameCode?: string) => {
  console.log("game update event", gameObject);
  if (gameCode !== undefined) {
    code.value = gameCode;
  }

  if (
    gameObject.gameState === "end" &&
    gameObject.winner !== null &&
    !gameObject.playAgain.includes(true)
  ) {
    Object.assign(game, gameObject, { gameState: "running" });
    setTimeout(() => {
      Object.assign(game, gameObject);
    }, 1500);
  } else {
    Object.assign(game, gameObject);
  }
});

socket.on("error", (errorMessage: ErrorMessage) => {
  console.log("error socket", errorMessage);
  if (errorMessage.errorCode === 4) {
    inGame.value = false;
    error.value =
      "Oops! Something went wrong.\n Please start or join a new game.";
    Object.assign(game, resetGame);
  }
});
</script>

<template>
  <div id="container">
    <Transition name="fall" type="animation" appear tag="div" mode="out-in">
      <StartMenu
        @update-player="(p:Player) => {player = p; inGame=true}"
        @update-error="(e:string) => error = e"
        @reset-error="() => (error = '')"
        v-if="inGame === false || (player == 2 && game.gameState === 'config')"
        :error="error"
      />
      <ConfigMenu
        v-if="
          (player === 1 && game.gameState === 'config') ||
          game.gameState === 'ready'
        "
        :code="code"
        :game-state="game.gameState"
        :play-again="game.playAgain"
        :row-count="rowCount"
        :col-count="colCount"
        :winning-comb="winningComb"
      />
      <GameScreen
        v-if="
          player !== null &&
          (game.gameState === 'running' || game.gameState === 'end') &&
          inGame === true
        "
        @leave-game="
          () => {
            inGame = false;
            Object.assign(game, resetGame);
          }
        "
        :row-count="rowCount"
        :col-count="colCount"
        :player="player"
        :slot-size="slotSize"
        :player-turn="game.playerTurn"
        :game-board="game.gameBoard"
        :code="code"
        :last-move="game.lastMove"
        :winning-slots="game.winningSlots"
        :score="game.score"
      />
    </Transition>
    <p
      id="credits"
      v-if="inGame === false || (player == 2 && game.gameState === 'config')"
    >
      Built in Vue3, Node.js & Typescript | Photo: Unsplash | © 2022 Robert
      Morávek & Irina Stelea
    </p>
  </div>
  <WaitScreen
    @leave-game="
      () => {
        inGame = false;
        Object.assign(game, resetGame);
      }
    "
    v-if="
      (game.gameState === 'ready' && inGame === true) ||
      (player === 2 && game.gameState === 'config' && inGame === true)
    "
    :code="code"
    :player="player"
  />
  <ResultsView
    v-if="
      game.gameState === 'end' ||
      (inGame == true && game.gameState === 'closed')
    "
    @leave-game="
      () => {
        inGame = false;
        Object.assign(game, resetGame);
      }
    "
    :winner="game.winner"
    :code="code"
    :player="player"
    :game-state="game.gameState"
    :play-again="game.playAgain"
    :row-count="rowCount"
    :col-count="colCount"
    :winning-comb="winningComb"
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
  align-items: flex-start;
  min-height: 100%;
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

#credits {
  position: fixed;
  bottom: 0;
  font-family: sans-serif;
  font-size: 0.5em;
  opacity: 0.8;
}
</style>
