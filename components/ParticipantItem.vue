<template>
  <tr>
    <td>
      <div class="profile-image">
        <img
          v-if="avatar === null || avatar === ''"
          class="avatar"
          src="~/assets/images/profile-default.png"
        />
        <img v-else class="avatar" :src="avatar" />
      </div>
      <div>
        <div class="student-id">{{ id }}</div>
        <div class="student-name">{{ name }}</div>
      </div>
    </td>
    <td v-if="taskStatus === 2" class="text-center status complete">
      <img src="~/assets/icons/circle-check.svg" />
      Complete
    </td>
    <td v-if="taskStatus === 1" class="text-center status in-progress">
      In Progress
    </td>
    <td v-if="taskStatus === 0" class="text-center status not-started">
      Not Started
    </td>
    <td class="text-center">{{ quizCreated }}</td>
    <td class="text-center">{{ quizSolved }}</td>
    <td class="text-center">{{ quizCommented }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    avatar: { type: String, default: null },
    id: { type: Number, default: null },
    name: { type: String, default: null },
    quizCreated: { type: Number, default: 0 },
    quizSolved: { type: Number, default: 0 },
    quizCommented: { type: Number, default: 0 },
  },

  computed: {
    taskStatus() {
      if (
        this.quizCreated === 5 &&
        this.quizSolved === 5 &&
        this.quizCommented === 5
      ) {
        return 2;
      } else if (
        this.quizCreated === 0 &&
        this.quizSolved === 0 &&
        this.quizCommented === 0
      ) {
        return 0;
      } else {
        return 1;
      }
    },
  },
};
</script>

<style src="./ParticipantItem.scss" lang="scss" scoped></style>
