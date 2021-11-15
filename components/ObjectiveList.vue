<template>
  <Wrapper rounded shadow class="objective-list">
    <Wrapper px="2" py="2" class="title">
      <img src="~assets/images/objective.png" />
      <span>Objectives</span>
    </Wrapper>
    <div class="column" style="margin-top: 8px">
      <ObjectiveItem
        v-for="(objective, index) in objectives"
        :key="index"
        :directive="objective.directive"
        :completed="objective.completed"
        :target="objective.target"
      />
    </div>
  </Wrapper>
</template>

<script>
export default {
  data() {
    return {
      objectives: [
        {
          directive: "Create",
          completed: 0,
          target: 0,
        },
        {
          directive: "Solve",
          completed: 0,
          target: 0,
        },
        {
          directive: "Comment on",
          completed: 0,
          target: 0,
        },
      ],
    };
  },

  created() {
    this.getObjectivesTarget();
    this.getCreatedQuizzes();
    this.getSolvedQuizzes();
    this.getCreatedComments();
  },

  methods: {
    async getObjectivesTarget() {
      try {
        await this.$axios
          .get("http://localhost:8080/class/target", {
            params: {
              code: this.$route.params.courseCode,
            },
          })
          .then(res => {
            for (let i = 0; i < res.data.target.length; i++) {
              this.objectives[i].target = res.data.target[i];
            }
          });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    async getCreatedQuizzes() {
      try {
        await this.$axios
          .get("http://localhost:8080/user/history/made", {
            params: {
              email: this.$store.state.userEmail,
            },
          })
          .then(res => {
            console.log(res.data.made.made.length);
            this.objectives[0].completed = res.data.made.made.length;
          });
      } catch (e) {
        console.log(e);
      }
    },

    async getSolvedQuizzes() {
      try {
        await this.$axios
          .get("http://localhost:8080/user/history/solved", {
            params: {
              email: this.$store.state.userEmail,
            },
          })
          .then(res => {
            console.log(res.data.solved.solved.length);
            this.objectives[1].completed = res.data.solved.solved.length;
          });
      } catch (e) {
        console.log(e);
      }
    },

    async getCreatedComments() {
      try {
        await this.$axios
          .get("http://localhost:8080/user/history/comment", {
            params: {
              email: this.$store.state.userEmail,
            },
          })
          .then(res => {
            this.objectives[2].completed = res.data.comment.length;
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style src="./ObjectiveList.scss" lang="scss" scoped />
