<script setup lang="ts">
import { ref, inject } from "vue";
import type {
  GameState,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";
import type { Socket } from "socket.io-client";

//TO DO: discuss final number of options columns, rows, winning slots

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const props = defineProps<{
  code: string;
  gameState: GameState;
  playAgain: boolean[];
}>();

const colCount = ref<number>(7);
const rowCount = ref<number>(6);
const winningSlots = ref<number>(4);

const handleStartGameClick = (): void => {
  socket.emit(
    "config-ready",
    [colCount.value, rowCount.value, winningSlots.value],
    props.code
  );
};

const handlePlayAgainClick = (): void => {
  socket.emit("play-again", props.code);
};
</script>

<template>
  <div id="config-container">
    <p class="code" v-if="props.gameState === 'config'">{{ code }}</p>
    <h1>Configure your game</h1>
    <label for="columns"> Columns</label>
    <input
      type="number"
      id="columns"
      min="7"
      max="11"
      step="1"
      v-model="colCount"
    />
    <label for="rows"> Rows</label>
    <input
      type="number"
      id="rows"
      placeholder="6"
      min="6"
      max="11"
      step="1"
      v-model="rowCount"
    />
    <label for="winning-slots"> Winning pieces</label>
    <input
      type="number"
      id="winning-slots"
      placeholder="4"
      min="4"
      max="6"
      step="1"
      v-model="winningSlots"
    />
    <button v-if="gameState === 'config'" @click="handleStartGameClick">
      Start game
    </button>
    <button v-if="gameState === 'end'" @click="handlePlayAgainClick">
      Play again
    </button>
  </div>
</template>

<style scoped>
#config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vh;
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

.code { 
  user-select: text;
}
</style>
