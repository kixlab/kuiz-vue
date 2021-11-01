<template>
  <Wrapper rounded shadow px="6" py="6" class="quiz-list">
    <div class="action-header">
      <!--
      <div class="search">
        <img src="~assets/icons/search.svg" />
        <input placeholder="Search keywords" />
      </div>
      -->
      <div
        class="select-category"
        @click="categoryListVisible = !categoryListVisible"
      >
        <div>{{ currentCategory }}</div>
        <div class="ye">
          <img src="~/assets/icons/arrow-dropdown-black.svg" />
        </div>
      </div>
      <ul
        v-if="categoryListVisible"
        v-click-outside="
          () => {
            categoryListVisible = !categoryListVisible;
          }
        "
        class="category-list"
      >
        <li
          v-for="(category, index) in categories"
          :key="index"
          class="category"
          @click="
            () => {
              currentCategory = category;
              categoryListVisible = !categoryListVisible;
            }
          "
        >
          {{ category }}
        </li>
      </ul>
      <Button
        bg="primary"
        icon="edit"
        class="create-quiz"
        @click.native="toggleQuizModal"
      >
        Create Quiz
      </Button>
    </div>
    <table class="table">
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
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapMutations } from "vuex";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },

  data() {
    return {
      currentCategory: "All Categories",
      categoryListVisible: false,
      categories: [
        "All Categories",
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
        "Category 6",
        "Category 7",
        "Category 8",
      ],
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
          tags: ["Magnetostatics"],
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

  methods: {
    ...mapMutations(["toggleQuizModal"]),
  },
};
</script>

<style src="./QuizList.scss" lang="scss" scoped />
