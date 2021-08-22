<template>
  <div class="notifications">
    <div class="content-wrapper">
      <Wrapper
        rounded
        shadow
        px="0"
        style="
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          height: 100%;
        "
      >
        <div class="scroll-area">
          <NotificationItem type="like"></NotificationItem>
          <NotificationItem type="comment"></NotificationItem>
          <NotificationItem type="like"></NotificationItem>
          <NotificationItem type="comment"></NotificationItem>
        </div>
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
    max-width: 900px;
    height: 100%;
    margin: 0 auto;
    padding: 48px;

    .scroll-area {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 0 16px;
    }
  }
}
</style>
