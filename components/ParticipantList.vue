<template>
  <Wrapper rounded shadow class="participant-list">
    <div class="title">
      <span>{{ participants.length }} participants in total</span>
      <span class="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="complete">
        Complete:
        {{ participantsFiltered.filter(p => p.taskStatus == 2).length }}
      </span>
      <span class="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="in-progress">
        In Progress:
        {{ participantsFiltered.filter(p => p.taskStatus == 1).length }}
      </span>
      <span class="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <span class="not-started">
        Not started:
        {{ participantsFiltered.filter(p => p.taskStatus == 0).length }}
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
          :task-status="
            participant.taskStatus == null ? 0 : participant.taskStatus
          "
          :quiz-created="participant.made == null ? 0 : participant.made.length"
          :quiz-solved="
            participant.solved == null ? 0 : participant.solved.length
          "
          :quiz-commented="
            participant.comment == null ? 0 : participant.comment.length
          "
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
    };
  },

  computed: {
    participantsFiltered() {
      const newList = this.participants;
      newList.sort((a, b) => {
        if (a.taskStatus === b.taskStatus) {
          return b.made.length - a.made.length;
        }
        return b.taskStatus - a.taskStatus;
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
            this.participants.map(this.getTaskStatus);
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

    getTaskStatus(p) {
      if (
        p.made.length >= this.target[0] &&
        p.solved.length >= this.target[1] &&
        p.comment.length >= this.target[2]
      ) {
        // Complete
        p.taskStatus = 2;
        return p;
      } else if (
        p.made.length === 0 &&
        p.solved.length === 0 &&
        p.comment.length === 0
      ) {
        // In Progress
        p.taskStatus = 1;
        return p;
      } else {
        // Not Started
        p.taskStatus = 0;
        return p;
      }
    },
  },
};
</script>

<style src="./ParticipantList.scss" lang="scss" scoped></style>
