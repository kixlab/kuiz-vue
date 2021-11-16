<template>
  <div class="activity">
    <div class="content-wrapper">
      <div class="title">My Activity</div>
      <Wrapper rounded shadow class="quiz-list">
        <div class="tab-group">
          <div
            class="tab"
            :class="{ active: activeTab === 0 }"
            @click="activeTab = 0"
          >
            Created Quizzes
          </div>
          <div
            class="tab"
            :class="{ active: activeTab === 1 }"
            @click="activeTab = 1"
          >
            Solved Quizzes
          </div>
        </div>

        <table v-if="activeTab === 0" class="table">
          <thead>
            <tr>
              <th class="text-center">No.</th>
              <th class="text-center">Question</th>
              <th class="text-center">Reactions</th>
              <th class="text-center">Author</th>
            </tr>
          </thead>
          <tbody>
            <QuizItem
              v-for="(quiz, index) in createdQuizzes"
              :id="quiz._id"
              :key="index"
              :quiz-id="createdQuizzes.length - index"
              :question="quiz.qStem"
              :tags="quiz.tags"
              :likes="quiz.likes.length"
              :comments="quiz.comment.length"
              :solved="quiz.solved"
              :answer="quiz.answer"
              :author="quiz.authorName"
              :date="quiz.createdAt"
              :explanation="quiz.explanation"
              :avatar="quiz.authorImg"
            />
          </tbody>
        </table>
        <div
          v-if="activeTab === 0 && createdQuizzes.length === 0"
          class="placeholder column-center text-center"
        >
          You have not created any quizzes yet.
          <div>
            Let's go
            <span
              @click="
                () => {
                  $router.push('/' + $route.params.courseCode + '/quizzes');
                }
              "
            >
              create a quiz!
            </span>
          </div>
        </div>

        <table v-if="activeTab === 1" class="table">
          <thead>
            <tr>
              <th class="text-center">No.</th>
              <th class="text-center">Question</th>
              <th class="text-center">Reactions</th>
              <th class="text-center">Author</th>
            </tr>
          </thead>
          <tbody>
            <QuizItem
              v-for="(quiz, index) in solvedQuizzes"
              :id="quiz._id"
              :key="index"
              :quiz-id="solvedQuizzes.length - index"
              :question="quiz.qStem"
              :tags="quiz.tags"
              :likes="quiz.likes.length"
              :comments="quiz.comment.length"
              :solved="quiz.solved"
              :answer="quiz.answer"
              :author="quiz.authorName"
              :date="quiz.createdAt"
              :explanation="quiz.explanation"
              :avatar="quiz.authorImg"
            />
          </tbody>
        </table>
        <div
          v-if="activeTab === 1 && solvedQuizzes.length === 0"
          class="placeholder column-center text-center"
        >
          You have not solved any quizzes yet.
          <div>
            <span
              @click="
                () => {
                  $router.push('/' + $route.params.courseCode + '/quizzes');
                }
              "
            >
              Discover
            </span>
            and solve quizzes made by other classmates!
          </div>
        </div>
      </Wrapper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      createdQuizzes: [],
      solvedQuizzes: [],
    };
  },

  created() {
    this.getCreatedQuizzes();
    this.getSolvedQuizzes();
  },

  methods: {
    async getCreatedQuizzes() {
      try {
        await this.$axios
          .get("http://localhost:8080/user/history/made", {
            params: {
              email: this.$store.state.userEmail,
            },
          })
          .then(res => {
            this.createdQuizzes = res.data.made.made.sort(
              this.sortByDateAscending,
            );
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
            this.solvedQuizzes = res.data.solved.solved.sort(
              this.sortByDateAscending,
            );
          });
      } catch (e) {
        console.log(e);
      }
    },

    sortByDateAscending(a, b) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";
@import "~/styles/colors.scss";

.activity {
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
    max-width: 960px;
    margin: 0 auto;

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      letter-spacing: -0.02em;
      margin-bottom: 20px;
    }

    .quiz-list {
      display: flex;
      flex-flow: column nowrap;
      min-height: 189px;
      padding: 0 !important;
      margin-top: 24px !important;

      .tab-group {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .tab {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 16px 0;
          font-size: 1.2rem;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
          letter-spacing: -0.02em;
          text-align: center;
          cursor: pointer;

          &:not(.active):hover {
            background-color: $grey-silver;
          }

          &.active {
            color: $white-flat;
            background-color: $blue-primary;
          }

          &:first-child {
            border-top-left-radius: 12px;
          }

          &:last-child {
            border-top-right-radius: 12px;
          }
        }
      }

      .placeholder {
        min-height: 225px;
        color: $grey-primary;

        span {
          color: $blue-primary;
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          cursor: pointer;
        }
      }

      .table {
        th,
        td {
          border-top: 1px solid $grey-silver;
        }

        thead th {
          background-color: $white-background;
          font-size: 0.8rem;
          font-weight: 500;
          color: $grey-primary;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          padding: 12px 16px;

          &:first-child {
            padding-left: 28px;
            padding-right: 28px;
          }

          &:nth-child(2) {
            padding-left: 0;
          }

          &:last-child {
            min-width: 130px;
          }
        }
      }
    }
  }
}
</style>
