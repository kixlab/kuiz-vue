<template>
  <Wrapper rounded class="notification-item">
    <div>
      <img src="~assets/icons/heart.svg" />
    </div>
    <div class="column">
      <div class="notification-target">
        Calculate the average rate of change and explain how it differs from the
        instantaneous rate of change.
      </div>
      <div class="notification-content">6 people liked your quiz.</div>
    </div>
    <slot />
  </Wrapper>
</template>

<script>
export default {};
</script>

<style src="./NotificationItem.scss" lang="scss" scoped></style>
