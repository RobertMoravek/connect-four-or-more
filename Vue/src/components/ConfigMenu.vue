<script setup lang="ts">
import type { GameState } from "../../types";
defineProps<{
  colCount: number;
  rowCount: number;
  winningSlots: number;
}>();

defineEmits<{
  (e: "update:colCount", n: number): void;
  (e: "update:rowCount", n: number): void;
  (e: "update:winningSlots", n: number): void;
  (e: "update-gameState", n: GameState): void;
}>();
</script>

<template>
  <div id="config-container">
    <h1>Configure your game</h1>
    <label for="columns"> Columns</label>
    <input
      type="number"
      id="columns"
      min="7"
      max="11"
      step="1"
      value="7"
      @input="
        $emit('update:colCount', +($event.target as HTMLInputElement).value)
      "
    />
    <label for="rows"> Rows</label>
    <input
      type="number"
      id="rows"
      value="6"
      placeholder="6"
      min="6"
      max="11"
      step="1"
      @input="
        $emit('update:rowCount', +($event.target as HTMLInputElement).value)
      "
    />
    <label for="winning-slots"> Winning pieces</label>
    <input
      type="number"
      id="winning-slots"
      value="4"
      placeholder="4"
      min="4"
      max="6"
      step="1"
      @input="
        $emit('update:winningSlots', +($event.target as HTMLInputElement).value)
      "
    />
    <button @click="$emit('update-gameState', 'ready')">Start game</button>
  </div>
</template>

<style scoped>
#config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3vh;
}

input {
  padding: 3px;
  margin: 10px;
  background-color: royalblue;
  color: white;
  font-size: 1.2em;
  border: 1px solid royalblue;
  text-align: center;
}

::placeholder {
  color: white;
}
</style>
