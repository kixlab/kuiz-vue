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
  padding: 48px;
  overflow: auto;

  .content-wrapper {
    width: 100%;
    margin: 0 auto;

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
