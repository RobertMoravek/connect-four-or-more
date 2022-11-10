<script setup lang="ts">
import { inject, computed, ref } from "vue";
import type { Socket } from "socket.io-client";
import type {
  Player,
  GameState,
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
  colCount: number;
  rowCount: number;
  winningComb: number;
}>();

const emit = defineEmits<{
  (e: "leave-game"): void;
}>();

const isConfigMenuVisible = ref<boolean>(false);
const isPlayAgainClicked = ref<boolean>(false);
const handlePlayAgainClick = (): void => {
  socket.emit("play-again", props.code);
  isPlayAgainClicked.value = true;
};
const handleLeaveGameClick = (): void => {
  socket.emit("leave-game");
  emit("leave-game");
  isPlayAgainClicked.value = false;
};

const handleChangeSettingsClick = (): void => {
  isConfigMenuVisible.value = true;
};

const resultsMessage = computed<string>(() =>
  props.winner === null
    ? "Draw"
    : props.winner === props.player
    ? "You win 🥳"
    : "You lose 😛"
);

const inviteFromOtherPlayer = computed<boolean>(
  () =>
    props.gameState !== "closed" &&
    ((props.player === 1 && props.playAgain[1] === true) ||
      (props.player === 2 && props.playAgain[0] === true))
);

const backgroundColorEndContainer = computed<string>(() => {
  if (props.playAgain.includes(true) && props.gameState !== "closed") {
    return "gold";
  } else {
    return "#ececec";
  }
});

// const backgroundImageEndContainer = computed<string>(() =>
//   isPlayAgainClicked.value || inviteFromOtherPlayer
//     ? "none"
//     : 'url("../assets/bluefog.jpg")'
// );
</script>

<template>
  <div class="modal">
    <div id="end-container">
      <h1
        v-if="
          props.gameState !== 'closed' &&
          isConfigMenuVisible === false &&
          !isPlayAgainClicked &&
          !inviteFromOtherPlayer
        "
      >
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
        v-if="
          props.player === 2 &&
          props.gameState !== 'closed' &&
          !isPlayAgainClicked
        "
        @click="handlePlayAgainClick"
      >
        Play again
      </button>
      <button
        v-if="
          props.player === 1 &&
          props.gameState !== 'closed' &&
          isConfigMenuVisible === false &&
          !isPlayAgainClicked
        "
        @click="handlePlayAgainClick"
      >
        Play again
      </button>
      <button
        v-if="
          props.player === 1 &&
          props.gameState !== 'closed' &&
          isConfigMenuVisible === false &&
          !isPlayAgainClicked
        "
        @click="handleChangeSettingsClick"
      >
        Change settings
      </button>
      <ConfigMenu
        v-if="
          isConfigMenuVisible && !isPlayAgainClicked && gameState !== 'closed'
        "
        @play-again-config="() => (isPlayAgainClicked = true)"
        :code="code"
        :game-state="gameState"
        :play-again="playAgain"
        :row-count="rowCount"
        :col-count="colCount"
        :winning-comb="winningComb"
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
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  gap: 0rem;
  background-color: v-bind(backgroundColorEndContainer);
  padding: 1rem;
  text-align: center;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: 3px solid var(--color-text);
  background-blend-mode: luminosity;
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
  overflow-y: auto;
  /* transform: translateY(-100%); */
}

@media screen and (max-height: 600px) {
  #end-container {
    min-width: 500px;
  }
}

</style>
