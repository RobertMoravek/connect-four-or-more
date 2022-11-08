<script setup lang="ts">
import { inject, ref } from "vue";
import type {
  Player,
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../types";
import type { Socket } from "socket.io-client";

const code = ref<string>("");
const emit = defineEmits<{
  (e: "update-player", player: Player): void;
}>();

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const handleNewGameClick = (): void => {
  emit("update-player", 1);
  socket.emit("new-game");
};

const handleJoinGameClick = (): void => {
  emit("update-player", 2);
  socket.emit("join-game", code.value);
};
</script>

<template>
  <div id="start-container">
    <h1>Connect4/more</h1>
    <button @click="handleNewGameClick">New game</button>
    <div id="join-container">
      <h2>Or join a game</h2>
      <label for="code"> Enter game code:</label>
      <input
        type="text"
        id="code"
        v-model="code"
        maxlength="6"
        style="text-transform: uppercase"
      />
      <button v-show="code.length == 6" @click="handleJoinGameClick">
        Join game
      </button>
    </div>
  </div>
</template>

<style scoped>
#start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

#join-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

#code {
  width: 10ch;
  text-align: center;
}
</style>
