<template>
  <div class="participants">
    <div class="content-wrapper">
      <div class="title">Participants</div>
      <Wrapper rounded shadow px="0" class="participant-list">
        <div class="scroll-area">
          Only instructors can view this page. They will be able to see
          students' current progress of each objective (TO BE DONE)
        </div>
      </Wrapper>
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

  .content-wrapper {
    width: 100%;
    max-width: 900px;
    height: 100%;
    margin: 0 auto;
    padding: 48px;

    .title {
      font-size: 25px;
      font-weight: 600;
      font-family: "Poppins";
    }

    .participant-list {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      min-height: 472px;
      margin-top: 24px;

      .scroll-area {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 0 16px;
      }
    }
  }
}
</style>
