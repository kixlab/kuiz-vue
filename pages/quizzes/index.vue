<template>
  <div class="quizzes">
    <div class="content-wrapper">
      <div class="title">Quizzes</div>
      <div class="inner-wrapper">
        <QuizList />
        <ObjectiveList />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.quizzes {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 60px 36px;
  @include mbd(xl) {
    padding: 60px 24px;
  }
  overflow: auto;

  .content-wrapper {
    width: 100%;
    margin: 0 auto;

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      letter-spacing: -0.02em;
    }

    .inner-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
}
</style>
