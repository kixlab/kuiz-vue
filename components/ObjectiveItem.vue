<template>
  <Wrapper px="2" py="3" class="objective-item">
    <div v-if="completed === total" class="row-center" style="padding: 3px">
      <img src="~assets/icons/circle-check.svg" />
    </div>
    <radial-progress-bar
      v-else
      :diameter="58"
      :stroke-width="5"
      :inner-stroke-width="5"
      :completed-steps="completed"
      :total-steps="total"
      :is-clockwise="false"
      start-color="#3d73dd"
      stop-color="#3d73dd"
      inner-stroke-color="#e1e9ff"
    >
      <div class="progress-count">{{ completed }}/{{ total }}</div>
    </radial-progress-bar>
    <span>{{ directive }}</span>
  </Wrapper>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  components: {
    RadialProgressBar,
  },

  props: {
    directive: { type: String, default: null },
    completed: { type: Number, default: null },
    total: { type: Number, default: null },
  },
};
</script>

<style src="./ObjectiveItem.scss" lang="scss" scoped></style>
