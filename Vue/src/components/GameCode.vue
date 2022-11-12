<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  code: string;
}>();

let animationRunning = ref<boolean>(false);

function copyToClipboard(): void {
  navigator.clipboard.writeText(props.code);
  animationRunning.value = !animationRunning.value;
  setTimeout(() => {
    animationRunning.value = !animationRunning.value;
  }, 1000);
}
</script>

<template>
  <div class="code-container">
    <h3>Game Code:</h3>
    <div class="code-and-scissors">
      <p class="code">{{ code }}</p>
      <div class="scissors" title="Copy" @click="copyToClipboard()">✂️</div>
    </div>
  </div>
</template>

<style scoped>
.code-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.code-and-scissors {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.code {
  -webkit-user-select: auto;
  user-select: auto;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: 3px solid var(--color-text);
  padding: 1rem;
  background-color: #ececec;
  box-shadow: inset 0 0 5px rgb(112, 112, 112);
}
.scissors {
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: 3px solid var(--color-text);
  padding: 1rem;
  background-color: #ececec;
  box-shadow: inset 0 0 5px rgb(112, 112, 112);
  transform: rotate(180deg);
  cursor: pointer;
  position: relative;
  user-select: none;
}
</style>
