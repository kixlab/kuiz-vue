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
  padding: 60px 36px;
  overflow: auto;

  .content-wrapper {
    width: 100%;
    max-width: 1200px;
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
