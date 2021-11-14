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
        :total="objective.total"
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
          directive: "Create 3 quizzes",
          completed: 1,
          total: 3,
        },
        {
          directive: "Solve 4 quizzes",
          completed: 2,
          total: 4,
        },
        {
          directive: "Give feedback on 5 quizzes",
          completed: 5,
          total: 5,
        },
      ],
      target: [],
      solved: 0,
      made: 0,
      comment: 0,
    };
  },

  created() {
    this.getTarget();
    this.getCreatedQuizzes();
    this.getSolvedQuizzes();
    this.getMadeComments();
  },

  methods: {
    async getTarget() {
      try {
        const res = await this.$axios.get("http://localhost:8080/class/target", {
          params: {
            code: this.$route.params.courseCode,
          },
        });
        this.target = res.data.target;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    async getCreatedQuizzes() {
      try {
        const res = await this.$axios.get(
          "http://localhost:8080/user/history/made",
          {
            params: {
              email: this.$store.state.userEmail,
            },
          },
        );
        this.made = res.data.made.made.length;
      } catch (e) {
        console.log(e);
      }
    },

    async getSolvedQuizzes() {
      try {
        const res = await this.$axios.get(
          "http://localhost:8080/user/history/solved",
          {
            params: {
              email: this.$store.state.userEmail,
            },
          },
        );
        this.solved = res.data.solved.solved.length;
      } catch (e) {
        console.log(e);
      }
    },

    async getMadeComments() {
      try {
        const res = await this.$axios.get(
          "http://localhost:8080/user/history/comment",
          {
            params: {
              email: this.$store.state.userEmail,
            },
          },
        );
        this.comment = res.data.comment.length;
        console.log("comment", this.comment);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style src="./ObjectiveList.scss" lang="scss" scoped />
