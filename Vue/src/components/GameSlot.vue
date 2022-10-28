<script setup lang="ts">
const props = defineProps<{
  playerTurn: Number;
  slots: Number;
}>();
// console.log("idx", props.idx);
</script>

<template>
  <div :class="'player-' + props.playerTurn">
    <div class="hole"></div>
  </div>
</template>

<style scoped>
.slot {
  width: 7vw;
  aspect-ratio: 1/1;
  /* height: 7vw; */
  /*center the hole in the middle of the square*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*hide the huge border of the hole*/
  overflow: hidden;
  /* margin: 3px; */
}

.hole {
  width: 5vw;
  /* height: 5vw; */
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: tomato;
  /*set a big border on the transparent hole*/
  /* box-shadow: 0 0 0 100vh blue; */
  border: 5vw solid royalblue;
  /*don't allow the hole to shrink to the container*/
  flex-shrink: 0;
  transform-style: preserve-3d;
  overflow: hidden;
  /* z-index: 100;
    position: absolute;
    background: transparent; */
}
</style>
