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
.quizzes {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  .content-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 48px;

    .title {
      font-size: 25px;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
    }

    .inner-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }
  }
}
</style>
