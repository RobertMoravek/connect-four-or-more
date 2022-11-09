<script setup lang="ts">
import GamePiece from './GamePiece.vue';

</script>

<template>
  <div id="score-container">
    <p>Player 1</p>
    <p>Player 2</p>
  </div>
</template>

<style scoped>
#score-container {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
}
</style>
