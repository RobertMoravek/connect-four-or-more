<script setup lang="ts">
import { ref, inject, computed } from "vue";
import type {
  GameState,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";
import type { Socket } from "socket.io-client";
import GameCode from "./GameCode.vue";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const props = defineProps<{
  code: string;
  gameState: GameState;
  playAgain: boolean[];
  colCount: number;
  rowCount: number;
  winningComb: number;
}>();

const emit = defineEmits<{
  (e: "play-again-config"): void;
}>();

// const colCountinComponent = computed<number>(() =>
//   props.colCount !== 0 ? props.colCount : 7
// );
const colCountinComponent = ref<number>(
  props.colCount && props.colCount !== 0 ? props.colCount : 7
);
// const rowCountinComponent = computed<number>(() =>
//   props.rowCount !== 0 ? props.rowCount : 6
// );
const rowCountinComponent = ref<number>(
  props.rowCount && props.rowCount !== 0 ? props.rowCount : 6
);
const winningCombinComponent = ref<number>(
  props.winningComb && props.winningComb !== 0 ? props.winningComb : 4
);
let animationRunning = ref<boolean>(false);

const handleStartGameClick = (): void => {
  socket.emit(
    "config-ready",
    [
      +colCountinComponent.value,
      +rowCountinComponent.value,
      +winningCombinComponent.value,
    ],
    props.code
  );
};

function copyToClipboard(): void {
  navigator.clipboard.writeText(props.code);
  animationRunning.value = !animationRunning.value;
  setTimeout(() => {
    animationRunning.value = !animationRunning.value;
  }, 1500);
}

const handlePlayAgainClick = (): void => {
  emit("play-again-config");
  socket.emit("play-again", props.code, [
    +colCountinComponent.value,
    +rowCountinComponent.value,
    +winningCombinComponent.value,
  ]);
};
</script>

<template>
  <div id="config-container">
    <GameCode v-if="props.gameState === 'config'" :code="code" />
    <div class="config">
      <h3>Configure your game</h3>
      <label for="columns"> Columns</label>
      <select name="columns" id="columns" v-model="colCountinComponent">
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
      </select>

      <label for="rows"> Rows</label>
      <select name="rows" id="rows" v-model="rowCountinComponent">
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
      </select>

      <label for="winning-slots"> Winning pieces</label>
      <select
        name="winning-slots"
        id="winning-slots"
        v-model="winningCombinComponent"
      >
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <button v-if="gameState === 'config'" @click="handleStartGameClick">
        Start game
      </button>
      <button v-if="gameState === 'end'" @click="handlePlayAgainClick">
        Play again
      </button>
    </div>
  </div>
</template>

<style scoped>
#config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.config {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

input {
  padding: 3px;
  margin: 10px;
  background-color: royalblue;
  color: white;
  font-size: 1.2em;
  border: 1px solid royalblue;
  text-align: center;
}

::placeholder {
  color: white;
}
</style>
