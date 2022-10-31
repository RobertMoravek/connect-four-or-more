<script setup lang="ts">
import type { Player } from "../../types";

defineEmits<{ (e: "update-player", player: Player): void }>();
</script>

<template>
  <div id="start-container">
    <h1>Welcome to Connect4/more</h1>
    <button @click="$emit('update-player', 1)">New game</button>
    <button @click="$emit('update-player', 2)">Join game</button>
  </div>
</template>

<style scoped>
#start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
}
</style>
