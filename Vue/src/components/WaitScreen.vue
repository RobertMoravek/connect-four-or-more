<script setup lang="ts">
import type { Player } from "../../types";
import GameCode from "./GameCode.vue";
const props = defineProps<{
  player: Player;
  code: string;
}>();
</script>

<template>
  <div class="modal">
    <div id="config-container">
      <GameCode v-if="props.player === 1" :code="code" />
      <h3>Please wait for the other player</h3>
    </div>
  </div>
</template>

<style scoped>
#config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  min-width: 300px;
  max-width: 600px;
  gap: 2rem;
  background-color: rgb(255, 255, 255);
  border: 2px solid #2c3e50;
  border-radius: 5px;
  padding: 1rem;
  text-align: center;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: 3px solid var(--color-text);
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
  gap: 5vh;
  /* transform: translateY(-100%); */
}

</style>
