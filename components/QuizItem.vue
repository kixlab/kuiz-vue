<template>
  <tr
    @click="
      () => {
        $router.push('/quizzes/' + quizId);
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
    <td class="text-center">{{ likes }}</td>
    <td class="text-center">{{ comments }}</td>
    <td class="text-center">
      <div class="column author">
        <div class="row-center">
          <div class="profile-image">
            <img class="avatar" :src="avatar" />
          </div>
          <div class="name">{{ author }}</div>
        </div>
        <div class="date">{{ date }}</div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    quizId: { type: Number, default: null },
    question: { type: String, default: null },
    tags: { type: Array, default: null },
    likes: { type: Number, default: null },
    comments: { type: Number, default: null },
    avatar: { type: String, default: null },
    author: { type: String, default: null },
    date: { type: String, default: null },
  },
};
</script>

<style src="./QuizItem.scss" lang="scss" scoped></style>
