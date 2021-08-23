<template>
  <Wrapper rounded shadow px="6" py="6" class="quiz-list">
    <table class="table">
      <thead>
        <tr>
          <th class="text-center">No.</th>
          <th class="text-center">Question</th>
          <th class="text-center">Likes</th>
          <th class="text-center">Comments</th>
          <th class="text-center">Author</th>
        </tr>
      </thead>
      <tbody>
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
      </tbody>
    </table>
  </Wrapper>
</template>

<script>
export default {};
</script>

<style src="./QuizList.scss" lang="scss" scoped />
