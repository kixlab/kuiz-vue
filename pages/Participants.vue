<template>
  <div class="participants">
    <div class="content-wrapper">
      <div class="title">Participants</div>
      <ParticipantList />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.participants {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  overflow: auto;

  .content-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 48px;

    .title {
      font-size: 25px;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
    }
  }
}
</style>
