<script setup lang="ts">
import { ref, computed } from "vue";
import type { Player } from "../../types";

const props = defineProps<{
  rowCount: number[];
  slotSize: number;
  // slots: number;
  player: Player;
}>();

const hover = ref<boolean>(false);

const holeSize = computed<number>(() => (props.slotSize * 5) / 7);
// const previewColor = computed<string>(() =>
//   props.player === 1 ? "tomato" : props.player === 2 ? "yellow " : ""
// );
</script>

<template>
  <div class="column">
    <div
      v-for="row in rowCount"
      :key="row"
      :idx="row"
      :class="'slot row-' + row"
    >
      <div class="hole" :class="hover && 'active'">
        <!-- <GameSlot
        v-for="slot in slots"
        :key="slot"
        :current-player="currentPlayer"
      /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.slot {
  width: v-bind(slotSize + "px");
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
  width: v-bind(holeSize + "px");
  aspect-ratio: 1/1;
  border-radius: 50%;
  /*set a big border on the transparent hole*/
  /* box-shadow: 0 0 0 100vh blue; */
  border: v-bind(holeSize + "px") solid royalblue;
  /*don't allow the hole to shrink to the container*/
  flex-shrink: 0;
  transform-style: preserve-3d;
  overflow: hidden;
  /* z-index: 100;
    position: absolute;
    background: transparent; */
}

/* .active {
  background-color: v-bind(previewColor);
} */
</style>
