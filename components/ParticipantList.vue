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
          :id="participant._id"
          :key="index"
          :target="targets"
          :avatar="participant.imageUrl"
          :name="participant.name"
          :quiz-created="participant.made==null?0:participant.made.length"
          :quiz-solved="participant.solved==null?0:participant.solved.length"
          :quiz-commented="participant.comment==null?0:participant.comment.length"
        />
      </tbody>
    </table>
  </Wrapper>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
      targets: [],
    };
  },

  created() {
    this.getParticipants();
  },
  methods: {
    async getParticipants() {
      try {
        await this.$axios
          .get("http://localhost:8080/class/participants/status", {
            params: {
              code: this.$route.params.courseCode,
            },
          })
          .then(res => {
            this.participants = res.data.info;
          });
      } catch (e) {
        console.log(e);
      }
    },

    async getObjectivesTarget() {
      try {
        await this.$axios
          .get("http://localhost:8080/class/target", {
            params: {
              code: this.$route.params.courseCode,
            },
          })
          .then(res => {
            this.targets = res.data.target;
          });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },

};
</script>

<style src="./ParticipantList.scss" lang="scss" scoped></style>
