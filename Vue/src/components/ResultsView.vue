<script setup lang="ts">
import { inject, computed, ref } from "vue";
import type { Socket } from "socket.io-client";
import type {
  Player,
  GameState,
  LeaveEventPayload,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types";
import ConfigMenu from "./ConfigMenu.vue";
import PlayAgainInvitationMessage from "./PlayAgainInvitationMessage.vue";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = inject(
  "socket"
) as Socket<ServerToClientEvents, ClientToServerEvents>;

const props = defineProps<{
  code: string;
  player: Player;
  winner: Player;
  gameState: GameState;
  playAgain: boolean[];
}>();

const emit = defineEmits<{
  (e: "leave-game"): void;
}>();

const isConfigVisible = ref<boolean>(false);
const handlePlayAgainClick = (): void => {
  socket.emit("play-again", props.code);
};
const handleLeaveGameClick = (): void => {
  socket.emit("leave-game");
  emit("leave-game");
};

const handleChangeSettingsClick = (): void => {
  isConfigVisible.value = true;
};

const resultsMessage = computed<string>(() =>
  props.winner === null
    ? "Draw"
    : props.winner === props.player
    ? "You win 🥳"
    : "You lose 😛"
);
</script>

<template>
  <div class="modal">
    <div id="end-container">
      <h1 v-if="props.gameState !== 'closed' && isConfigVisible === false">
        {{ resultsMessage }}
      </h1>
      <PlayAgainInvitationMessage
        :game-state="gameState"
        :player="player"
        :play-again="playAgain"
      />
      <p v-if="props.gameState === 'closed'">
        The other player has left the game
      </p>
      <button
        v-if="props.player === 2 && props.gameState !== 'closed'"
        @click="handlePlayAgainClick"
      >
        Play again
      </button>
      <button
        v-if="
          props.player === 1 &&
          props.gameState !== 'closed' &&
          isConfigVisible === false
        "
        @click="handlePlayAgainClick"
      >
        Play again
      </button>
      <button
        v-if="
          props.player === 1 &&
          props.gameState !== 'closed' &&
          isConfigVisible === false
        "
        @click="handleChangeSettingsClick"
      >
        Change settings
      </button>
      <ConfigMenu
        v-if="isConfigVisible"
        :code="code"
        :game-state="gameState"
        :play-again="playAgain"
      />
      <button @click="handleLeaveGameClick">Leave</button>
    </div>
  </div>
</template>

<style scoped>
#end-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
  width: 50%;
  background-color: rgb(255, 255, 255);
  border: 2px solid #2c3e50;
  border-radius: 5px;
  padding: 1vh 1vw;
  text-align: center;
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
  align-items: center;
  justify-content: center;
  /* transform: translateY(-100%); */
}
</style>
