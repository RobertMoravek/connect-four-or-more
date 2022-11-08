<script setup lang="ts">
import { inject, computed } from "vue";
import type { Socket } from "socket.io-client";
import type {
  Player,
  GameState,
  LeaveEventPayload,
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types";
import ConfigMenu from "./ConfigMenu.vue";

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

// const emit = defineEmits<{
//   (e: "leave-game", p: LeaveEventPayload): void;
// }>();

const handlePlayAgainClick = (): void => {
  socket.emit("play-again", props.code);
};
const handleLeaveGameClick = (): void => {
  socket.emit("leave-game");
};

const resultsMessage = computed<string>(() =>
  props.winner === null
    ? "Draw"
    : props.winner === props.player
    ? "You win 🥳"
    : "You lose 😛"
);

// const showInviteMessage = computed<boolean>(
//   () =>
//     (props.player === 1 && props.playAgain[1] === true) ||
//     (props.player === 2 && props.playAgain[0] === true)
// );
</script>

<template>
  <div class="modal">
    <div id="end-container">
      <h1>{{ resultsMessage }}</h1>
      <p
        v-if="
          (props.player === 1 && props.playAgain[1] === true) ||
          (props.player === 2 && props.playAgain[0] === true)
        "
      >
        The other player invited you to a new game
      </p>
      <button v-if="props.player === 2" @click="handlePlayAgainClick">
        Play again
      </button>
      <ConfigMenu
        v-if="props.player === 1"
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
  gap: 10vh;
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
</style>
