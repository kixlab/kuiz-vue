<template>
  <Wrapper rounded class="notification-item">
    <div class="image-wrapper">
      <img :src="require('~/assets/icons/' + type + '.svg')" />
    </div>
    <div class="text-wrapper column">
      <div class="row">
        <span v-if="type === 'comment'">"</span>
        <span v-if="type === 'like'" class="notification-target">
          Calculate the average rate of change and explain how it differs from
          the instantaneous rate of change.
        </span>
        <span v-if="type === 'comment'" class="notification-target">
          I think your quiz has a major flaw in that the initial conditions may
          vary depending on the circumstance.
        </span>
        <span v-if="type === 'comment'">"</span>
      </div>
      <div v-if="type === 'like'" class="notification-content">
        6 people liked your quiz.
      </div>
      <div v-if="type === 'comment'" class="notification-content">
        John Doe commented on your quiz.
      </div>
    </div>
    <slot />
  </Wrapper>
</template>

<script>
export default {
  props: {
    type: { type: String, default: null },
  },
};
</script>

<style src="./NotificationItem.scss" lang="scss" scoped></style>
