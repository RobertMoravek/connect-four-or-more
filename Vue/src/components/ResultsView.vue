<script setup lang="ts">
import { inject } from "vue";
import type { Socket } from "socket.io-client";
import type {
  LeaveEventPayload,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const props = defineProps<{
  code: string;
}>();

const emit = defineEmits<{
  (e: "leave-game-component", p: LeaveEventPayload): void;
}>();

const handlePlayAgainClick = (): void => {
  socket.emit("play-again", props.code);
};
const handleLeaveGameClick = (): void => {
  socket.emit("leave-game");
  emit("leave-game-component", { player: null, gameState: "config" });
};
</script>

<template>
  <h1>Aaand the loser is:</h1>
  <button @click="handlePlayAgainClick">Play again</button>
  <button>Change board</button>
  <button @click="handleLeaveGameClick">Leave</button>
</template>

<style scoped>
#end-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
}
</style>
