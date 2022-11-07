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
    <h1>Welcome to Connect4/more</h1>
    <button @click="handleNewGameClick">New game</button>
    <div id="join-container">
      <p>Or add a code below to join an existing game</p>
      <label for="code"> Game code</label>
      <input type="text" id="code" v-model="code" />
      <button v-if="code" @click="handleJoinGameClick">Join game</button>
    </div>
  </div>
</template>

<style scoped>
#start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
}

#join-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1vh;
}
</style>
