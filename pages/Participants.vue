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
@import "~/styles/mixins.scss";

.participants {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 48px 36px;
  @include mbd(xl) {
    padding: 36px 24px;
  }
  overflow: auto;

  .content-wrapper {
    width: 100%;
    max-width: 1000px;
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
