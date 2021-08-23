<template>
  <Wrapper py="5" class="objective-item">
    <!--<img src="~assets/icons/circle-check.svg" />-->
    <radial-progress-bar
      :diameter="64"
      :stroke-width="6"
      :inner-stroke-width="6"
      :completed-steps="completedSteps"
      :total-steps="totalSteps"
      :is-clockwise="false"
      start-color="#3d73dd"
      stop-color="#3d73dd"
      inner-stroke-color="#e1e9ff"
    >
      <div class="progress-count">{{ completedSteps }}/{{ totalSteps }}</div>
    </radial-progress-bar>
    <span>Create 8 Quizzes</span>
  </Wrapper>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  components: {
    RadialProgressBar,
  },

  data() {
    return {
      completedSteps: 4,
      totalSteps: 8,
    };
  },
};
</script>

<style src="./ObjectiveItem.scss" lang="scss" scoped></style>
