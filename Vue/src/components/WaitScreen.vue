<script setup lang="ts">
import type { Player } from "../../types";
const props = defineProps<{
  player: Player;
  code: string;
}>();
</script>

<template>
  <div class="modal">
    <div id="config-container">
      <p v-if="props.player === 1" class="code">Game code: {{ code }}</p>
      <h1>Please wait for the other player</h1>
    </div>
  </div>
</template>

<style scoped>
#config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 3vh;
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
  justify-content: center;
  align-items: center;
  gap: 10vh;
  /* transform: translateY(-100%); */
}
.code {
  -webkit-user-select: auto;
  user-select: auto;
}
</style>
