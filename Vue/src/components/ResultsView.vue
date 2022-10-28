<script setup lang="ts">
import type { LeaveEventPayload } from "../../types";

defineEmits<{
  (e: "leave-game", p: LeaveEventPayload): void;
}>();
</script>

<template>
  <h1>Aaand the loser is:</h1>
  <button>Play again</button>
  <button>Change board</button>
  <button @click="$emit('leave-game', { player: null, gameState: 'config' })">
    Leave
  </button>
</template>

<style scoped>
#end-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
}
</style>
