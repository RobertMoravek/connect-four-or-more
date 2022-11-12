<script setup lang="ts">
import { inject, ref } from "vue";
import type { Socket } from "socket.io-client";
import type {
  Player,
  ServerToClientEvents,
  ClientToServerEvents,
  ErrorMessage,
} from "../../types";

const code = ref<string>("");
const props = defineProps<{
  error: string;
}>();

const emit = defineEmits<{
  (e: "update-player", player: Player): void;
  (e: "reset-error"): void;
  (e: "update-error", error: string): void;
}>();

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

socket.on("error", (errorMessage: ErrorMessage) => {
  if (errorMessage.errorCode === 1) {
    emit(
      "update-error",
      "Oops! A game with that code does not exist. \n Please enter a valid code."
    );
  }
});

const handleNewGameClick = (): void => {
  emit("update-player", 1);
  emit("reset-error");
  socket.emit("new-game");
};

const handleJoinGameClick = (): void => {
  socket.emit("join-game", code.value.toUpperCase());
  if (props.error) {
    emit("reset-error");
  }
  setTimeout(() => {
    if (!props.error) {
      emit("update-player", 2);
    }
  }, 500);
  code.value = "";
};
</script>

<template>
  <div id="start-container">
    <h1>Connect4/more</h1>
    <p v-if="props.error" id="error-message">{{ error }}</p>
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
        @keyup.enter="handleJoinGameClick"
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
  gap: 1rem;
  margin-top: 2rem;
  height: 100%;
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

#error-message {
  color: crimson;
  font-size: 0.8em;
  white-space: pre-wrap;
  text-align: center;
}

@media screen and (max-height: 600px) {
  #start-container {
    margin-top: 0;
    gap: 0.75rem;
  }

  #join-container {
    gap: 0;
  }
}
</style>
