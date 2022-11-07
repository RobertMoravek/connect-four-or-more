

<script setup lang="ts">
import type { Player } from "../../types";
import { computed} from "vue";

defineEmits<{ (e: "update-player", player: Player): void }>();
const props = defineProps<{
  windowHeight: number;
}>();
const getWindowHeight = computed<number>(() => -props.windowHeight/2)

</script>

<template>
  <Transition name="fall" mode="out-in" appear>
    <div id="start-container">
      <h1>Connect4/more</h1>
      <button @click="$emit('update-player', 1)">New game</button>
      <button @click="$emit('update-player', 2)">Join game</button>
    </div>
  </Transition>
</template>

<style scoped>
#start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
}



.fall-enter-active {
  animation: bounce 0.7s ease-in;
}
.fall-leave-active {
  animation: bounce 0.7s ease-in reverse;
}

@keyframes bounce {
  0% {
    transform: translateY(v-bind(getWindowHeight + "px"));
  }
  40% {
    transform: translateY(v-bind(getWindowHeight * 0.3 + "px"));
  }
  65% {
    transform: translateY(v-bind(getWindowHeight * 0.15 + "px"));
  }
  82% {
    transform: translateY(v-bind(getWindowHeight * 0.075 + "px"));
  }
  92% {
    transform: translateY(v-bind(getWindowHeight * 0.0335 + "px"));
  }
  55%,
  75%,
  87%,
  97%,
  100% {
    transform: translateY(0px);
  }
}
</style>
