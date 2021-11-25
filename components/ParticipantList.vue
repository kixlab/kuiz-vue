<template>
  <Wrapper rounded shadow class="participant-list">
    <div class="title">
      <span>{{ participants.length }} participants in total</span>
      <span class="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="complete">
        Complete:
        {{ complete }}
      </span>
      <span class="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="in-progress">
        In Progress:
        {{ inProgress }}
      </span>
      <span class="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="not-started">
        Not started:
        {{ notStarted }}
      </span>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-center">Task Status</th>
          <th class="text-center">
            Quizzes Created
            <div class="goal">Goal: {{ target[0] }}</div>
          </th>
          <th class="text-center">
            Quizzes Solved
            <div class="goal">Goal: {{ target[1] }}</div>
          </th>
          <th class="text-center">
            Comments
            <div class="goal">Goal: {{ target[2] }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <ParticipantItem
          v-for="(participant, index) in participantsFiltered"
          :id="participant.sid"
          :key="index"
          :target="target"
          :avatar="participant.imageUrl"
          :name="participant.name"
          :quiz-created="participant.made == null ? 0 : participant.made.length"
          :quiz-solved="
            participant.solved == null ? 0 : participant.solved.length
          "
          :quiz-commented="
            participant.comment == null ? 0 : participant.comment.length
          "
          @status="updateStatus"
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
      target: [],
      complete: 0,
      inProgress: 0,
      notStarted: 0,
    };
  },

  computed: {
    participantsFiltered() {
      const newList = this.participants;
      newList.sort((a, b) => {
        const aSum = a.made.length + a.solved.length + a.comment.length;
        const bSum = b.made.length + b.solved.length + b.comment.length;
        return bSum - aSum;
      });
      return newList;
    },
  },

  created() {
    this.getParticipants();
    this.getObjectivesTarget();
  },

  methods: {
    async getParticipants() {
      try {
        await this.$axios
          .get(`${process.env.baseURL}/class/participants/status`, {
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
          .get(`${process.env.baseURL}/class/target`, {
            params: {
              code: this.$route.params.courseCode,
            },
          })
          .then(res => {
            this.target = res.data.target;
          });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    updateStatus(val) {
      switch (val) {
        case 2:
          this.complete += 1;
          break;
        case 1:
          this.inProgress += 1;
          break;
        case 3:
          this.notStarted += 1;
          break;
      }
    },
  },
};
</script>

<style src="./ParticipantList.scss" lang="scss" scoped></style>
