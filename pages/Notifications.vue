<template>
  <div class="notifications">
    <div class="content-wrapper">
      <Wrapper
        rounded
        shadow
        style="display: flex; flex-flow: column nowrap; align-items: center"
      >
        <NotificationItem></NotificationItem>
      </Wrapper>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.notifications {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  .content-wrapper {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px;
  }
}
</style>
