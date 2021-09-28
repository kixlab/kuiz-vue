<template>
  <div class="notifications">
    <div class="content-wrapper">
      <div class="title">Notifications</div>
      <NotificationList />
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
  padding: 60px 36px;
  overflow: auto;

  .content-wrapper {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      letter-spacing: -0.02em;
    }
  }
}
</style>
