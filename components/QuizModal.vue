<template>
  <transition name="fade">
    <div
      v-if="quizModalVisible"
      style="animation-duration: 0.3s"
      class="quiz-modal"
      @click="closeQuizModal"
    >
      <div class="outer-wrapper" @click.stop>
        <Wrapper rounded shadow px="5" py="5" class="inner-wrapper">
          <section class="form-wrapper column">
            <form>
              <p style="font-size: 11px">New Question: {{ quizData }}</p>
              <div class="stem">
                <div class="title">Write your question text</div>
                <textarea
                  v-model="quizData.qStem"
                  placeholder="Question text goes here"
                  rows="4"
                />
              </div>

              <div class="answer-list">
                <div class="title">Answer Options</div>
                <draggable
                  v-model="quizData.answerOptions"
                  v-bind="dragOptions"
                  tag="div"
                  handle=".handle"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <transition-group
                    type="transition"
                    tag="ul"
                    :name="!drag ? 'flip-list' : null"
                    class="column"
                  >
                    <li
                      v-for="(answer, index) in quizData.answerOptions"
                      :key="index + 0"
                      class="answer-item"
                    >
                      <div class="handle">
                        <img src="~/assets/icons/menu-black.svg" />
                      </div>
                      <input v-model="quizData.answerOptions[index]" />
                    </li>
                  </transition-group>
                </draggable>
              </div>

              <div class="explanation">
                <div class="title">Provide an explanation</div>
                <textarea
                  v-model="quizData.explanation"
                  placeholder="Explanation goes here"
                  rows="4"
                />
              </div>

              <div class="tags">
                <div class="title">Select a category</div>
                <select v-model="quizData.tags">
                  <option v-for="(tag, index) in tags" :key="index">
                    {{ tag }}
                  </option>
                </select>
              </div>

              <input
                v-model.number="quizData.answer"
                placeholder="right answer number"
              />

              <div class="row-center">
                <Button bg="primary" @click.native="createQuiz">
                  Create Quiz
                </Button>
              </div>
            </form>
          </section>
        </Wrapper>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      quizData: {
        author: this.$store.state.uid,
        authorName: this.$store.state.userName,
        authorImg: this.$store.state.userImage,
        qStem: "",
        tags: [],
        explanation: "",
        answerOptions: [
          "Answer Option 111",
          "Answer Option 222",
          "Answer Option 333",
        ],
        answer: null,
      },
      tags: [],
      drag: false,
    };
  },

  computed: {
    quizModalVisible() {
      return this.$store.state.quizModalVisible;
    },

    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },

  mounted() {
    window.addEventListener("keydown", this.keyDownHandler);
  },

  destroyed() {
    window.removeEventListener("keydown", this.keyDownHandler);
  },

  created() {
    this.getTags();
  },

  methods: {
    ...mapMutations(["closeQuizModal", "toggleQuizModal"]),

    keyDownHandler(e) {
      if (e.key === "Escape") {
        this.closeQuizModal();
      }
    },

    async getTags() {
      try {
        console.log("code", this.$route.params.courseCode);
        const res = await this.$axios.post("http://localhost:8080/class/tag", {
          code: this.$route.params.courseCode,
        });
        this.tags = res.data.tags;
        this.quizData.tags = res.data.tags[0];
      } catch (e) {
        console.log(e);
      }
    },

    async createQuiz() {
      try {
        const quizData = this.quizData;
        const classId = this.$route.params.courseCode;
        await this.$axios
          .post("http://localhost:8080/class/question/create", {
            quizData,
            classId,
          })
          .then(res => {
            this.closeQuizModal();
          });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style src="./QuizModal.scss" lang="scss" scoped />
