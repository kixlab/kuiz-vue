<template>
  <tr
    @click="
      () => {
        $router.push('/' + $route.params.courseCode + '/quizzes/' + id);
      }
    "
  >
    <td class="text-center quiz-id">#{{ quizId }}</td>
    <td class="question">
      <div class="text">
        {{ question }}
      </div>
      <div class="tags">
        <Tag v-for="(tag, index) in tags" :key="index">{{ tag }}</Tag>
      </div>
    </td>
    <td class="reactions">
      <div class="like text-center">
        <img src="~/assets/icons/like.svg" />
        {{ likes }}
      </div>
      <div class="comment text-center">
        <img src="~/assets/icons/comment.svg" />
        {{ comments }}
      </div>
      <div
        v-tooltip.bottom="
          correctRatio +
          '% of students got the correct answer on their first try.'
        "
        class="correct-ratio text-center"
      >
        <img src="~assets/icons/check-circle.svg" />
        {{ correctRatio }}%
      </div>
    </td>
    <td class="text-center">
      <div class="column author">
        <div class="row-center">
          <div class="profile-image">
            <img class="avatar" :src="avatarUrl" />
          </div>
          <div class="name">{{ author }}</div>
        </div>
        <div class="date"><Date :date="date" /></div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: { type: String, default: null },
    answer: { type: Number, default: null },
    solved: { type: Array, default: null },
    quizId: { type: Number, default: null },
    question: { type: String, default: null },
    tags: { type: Array, default: null },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    avatar: { type: String, default: null },
    author: { type: String, default: null },
    authorName: { type: String, default: null },
    date: { type: String, default: null },
  },

  computed: {
    avatarUrl() {
      if (
        this.avatar === null ||
        this.avatar === undefined ||
        this.avatar === ""
      ) {
        return require("~/assets/images/profile-default.png");
      } else {
        return this.avatar;
      }
    },

    correctRatio() {
      if (this.solved.length !== 0) {
        const correct = this.solved.filter(e => e.selected === this.answer);
        const total = this.solved.length;

        return Math.round(((correct.length * 1.0) / total) * 100);
      } else {
        return 0;
      }
    },
  },
};
</script>

<style src="./QuizItem.scss" lang="scss" scoped></style>
