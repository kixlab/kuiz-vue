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
        <div>
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
          :id="quiz._id"
          :key="index"
          :quiz-id="quizzes.length - index"
          :question="quiz.qStem"
          :tags="quiz.tags"
          :likes="quiz.likes.length"
          :comments="quiz.comment.length"
          :correct-ratio="quiz.correctRatio"
          :author="quiz.authorName"
          :date="quiz.createdAt"
          :explanation="quiz.explanation"
          :avatar="quiz.authorImg"
        />
      </tbody>
    </table>
    <div
      v-if="quizzes.length === 0"
      class="placeholder column-center text-center"
    >
      There are no quizzes yet.
      <div>
        Be the first to
        <span @click="toggleQuizModal">create a quiz!</span>
      </div>
    </div>
  </Wrapper>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapMutations } from "vuex";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },

  props: {
    courseCode: { type: String, default: null },
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
      quizzes: [],
    };
  },

  created() {
    this.getQuizList();
    this.getTag();
  },

  methods: {
    ...mapMutations(["toggleQuizModal"]),

    async getQuizList() {
      try {
        await this.$axios
          .get("http://localhost:8080/class/question/load", {
            params: {
              code: this.courseCode,
            },
          })
          .then(res => {
            this.quizzes = res.data.questions.questionDatas.sort(
              this.sortByDateAscending,
            );
          });
      } catch (e) {
        console.log(e);
      }
    },

    async getTag() {
      try {
        const res = await this.$axios.post("http://localhost:8080/class/tag", {
          code: this.$route.params.courseCode,
        });
        this.categories = res.data.tags;
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

<style src="./QuizList.scss" lang="scss" scoped />
