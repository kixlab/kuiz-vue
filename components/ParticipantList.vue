<template>
  <Wrapper rounded shadow class="participant-list">
    <div class="title">
      {{ participants.length }} students participating in total
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-center">Task Status</th>
          <th class="text-center">Quizzes Created</th>
          <th class="text-center">Quizzes Solved</th>
          <th class="text-center">Comments</th>
        </tr>
      </thead>
      <tbody>
        <ParticipantItem
          v-for="(participant, index) in participants"
          :id="participant.id"
          :key="index"
          :avatar="participant.avatar"
          :name="participant.name"
          :quiz-created="participant.quizCreated"
          :quiz-solved="participant.quizSolved"
          :quiz-commented="participant.quizCommented"
        />
      </tbody>
    </table>
  </Wrapper>
</template>

<script>
export default {
  data() {
    return {
      participants: [
        {
          avatar: "https://www.kixlab.org/assets/img/members/nicolelee.jpg",
          id: 20123456,
          name: "Nicole Lee",
          quizCreated: 5,
          quizSolved: 5,
          quizCommented: 5,
        },
        {
          avatar: "https://www.kixlab.org/assets/img/members/nebjuok.jpg",
          id: 20123456,
          name: "Jaeryoung Ka",
          quizCreated: 5,
          quizSolved: 4,
          quizCommented: 3,
        },
        {
          avatar: "https://www.kixlab.org/assets/img/members/inhwa.jpg",
          id: 20123456,
          name: "Inhwa Song",
          quizCreated: 3,
          quizSolved: 5,
          quizCommented: 5,
        },
        {
          avatar: "https://www.kixlab.org/assets/img/members/Nurlykhan.jpg",
          id: 20123456,
          name: "Nurlykhan Kopenov",
          quizCreated: 2,
          quizSolved: 5,
          quizCommented: 4,
        },
        {
          avatar: "https://juhokim.com/images/Me/juhokim-profile-2016-1.jpg",
          id: 20123456,
          name: "Juho Kim",
          quizCreated: 3,
          quizSolved: 5,
          quizCommented: 3,
        },
        {
          avatar: "https://www.kixlab.org/assets/img/members/haesoo.png",
          id: 20123456,
          name: "Haesoo Kim",
          quizCreated: 4,
          quizSolved: 3,
          quizCommented: 5,
        },
        {
          avatar: "https://www.kixlab.org/assets/img/members/ejung.png",
          id: 20123456,
          name: "Elliot Jung",
          quizCreated: 0,
          quizSolved: 0,
          quizCommented: 0,
        },
      ],
    };
  },
};
</script>

<style src="./ParticipantList.scss" lang="scss" scoped></style>
