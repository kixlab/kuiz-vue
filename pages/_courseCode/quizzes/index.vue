<template>
  <div class="quizzes">
    <div class="content-wrapper">
      <div class="title">Quizzes</div>
      <div class="inner-wrapper">
        <QuizList :course-code="courseCode" />
        <ObjectiveList />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      courseCode: null,
    };
  },

  created() {
    this.closeQuizModal();
    this.courseCode = this.$route.params.courseCode;
  },

  methods: { ...mapMutations(["closeQuizModal"]) },
};
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.quizzes {
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
