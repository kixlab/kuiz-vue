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
              v-for="(quiz, index) in quizzes"
              :key="index"
              :quiz-id="quiz.quizId"
              :question="quiz.question"
              :tags="quiz.tags"
              :likes="quiz.likes"
              :comments="quiz.comments"
              :correct-ratio="quiz.correctRatio"
              :avatar="quiz.avatar"
              :author="quiz.author"
              :date="quiz.date"
            />
          </tbody>
        </table>

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
              v-for="(quiz, index) in quizzes"
              :key="index"
              :quiz-id="quiz.quizId"
              :question="quiz.question"
              :tags="quiz.tags"
              :likes="quiz.likes"
              :comments="quiz.comments"
              :correct-ratio="quiz.correctRatio"
              :avatar="quiz.avatar"
              :author="quiz.author"
              :date="quiz.date"
            />
          </tbody>
        </table>
      </Wrapper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      quizzes: [
        {
          quizId: 123,
          question:
            "A straight wire carries a current of 10A toward the top of the page. How many cups of coffee did Elliot drink last night?",
          tags: ["Electrostatics"],
          likes: 5,
          comments: 12,
          correctRatio: 12,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Elliot Jung",
          date: "Oct 10 at 8:00 PM",
        },
        {
          quizId: 122,
          question:
            "By how much would the magnetic field change if the current was doubled and the distance r was doubled?",
          tags: ["Magnetostatistics"],
          likes: 6,
          comments: 5,
          correctRatio: 99,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Inhwa Song",
          date: "Oct 10 at 5:41 PM",
        },
        {
          quizId: 121,
          question:
            "An electron enters a region of uniform magnetic field in the -Z direction. What is the direction of the magnetic force on the electron due to the magnetic field?",
          tags: ["Electrostatics"],
          likes: 10,
          comments: 7,
          correctRatio: 45,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Haesoo Kim",
          date: "Oct 10 at 11:33 AM",
        },
        {
          quizId: 120,
          question:
            "A physics student sets up an experiment with a long wire carrying current in the +Y direction and a small ball attached to a thread with a charge of -q. Assuming that the student cannot observe or measure changes in tension in what way can the student move the ball so that there will be an observable magnetic force acting on the ball?",
          tags: ["Electrostatics"],
          likes: 9,
          comments: 9,
          correctRatio: 30,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Jaeryoung Ka",
          date: "Oct 10 at 7:25 AM",
        },
        {
          quizId: 119,
          question:
            "A horizontal wire is carrying current to the east and a proton is moving with a velocity v to the west. What is the direction of the magnetic force acting on the proton due to the current carrying wire?",
          tags: ["Magnetostatics"],
          likes: 7,
          comments: 8,
          correctRatio: 80,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Nicole Lee",
          date: "Oct 9 at 9:15 PM",
        },
        {
          quizId: 118,
          question:
            "A circular loop of wire carries current in a counterclockwise direction. The loop is placed in a uniform magnetic field directed into the page. What is the effect of the magnetic force on the loop due to the field?",
          tags: ["Magnetostatics"],
          likes: 5,
          comments: 5,
          correctRatio: 66,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Nurlykhan Kopenov",
          date: "Oct 9 at 2:56 PM",
        },
        {
          quizId: 117,
          question:
            "An electron enters a uniform electric field perpendicular to the field lines. What must be the direction of the magnetic field in order to cancel the electric force effect?",
          tags: ["Electrostatics"],
          likes: 0,
          comments: 1,
          correctRatio: 27,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Elliot Jung",
          date: "Oct 8 at 7:10 PM",
        },
        {
          quizId: 116,
          question:
            "One wire is carrying current into the page and the other three wires are carrying current out of the page. The distance between each wire and point A is r. What is the magnitude and direction of the magnetic field at point A?",
          tags: ["Electrostatics"],
          likes: 3,
          comments: 11,
          correctRatio: 1,
          avatar:
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
          author: "Elliot Jung",
          date: "Oct 8 at 3:13 PM",
        },
      ],
    };
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
