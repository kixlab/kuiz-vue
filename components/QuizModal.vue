<template>
  <transition name="fade">
    <div
      v-if="quizModalVisible"
      style="animation-duration: 0.3s"
      class="quiz-modal"
      @click="closeQuizModal"
    >
      <Wrapper rounded shadow class="outer-wrapper" @click.native.stop>
        <div class="inner-wrapper">
          <section class="form-wrapper column">
            <form>
              <div class="stem">
                <div class="title">1. Compose your question</div>
                <textarea
                  v-model="quizData.qStem"
                  placeholder="Create a question using specific expressions with a clear definition."
                  rows="4"
                />
              </div>

              <div class="answer-list">
                <div class="title">
                  2. Create answer choices
                  <span class="instruction">
                    You can create up to 5 answer choices.
                  </span>
                </div>

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
                      <div class="handle row-center">
                        <img src="~/assets/icons/menu-black.svg" />
                      </div>
                      <input
                        v-model="quizData.answerOptions[index].text"
                        placeholder="Provide an answer option"
                      />
                      <div
                        v-if="quizData.answerOptions.length > 2"
                        :class="{
                          hidden: drag === true,
                        }"
                        class="action delete-option"
                        @click="deleteOption(index)"
                      >
                        <img src="~/assets/icons/delete.svg" />
                      </div>
                      <div
                        v-tooltip.right="
                          `${
                            answer.correct === true ? 'Marked' : 'Mark'
                          } as correct answer`
                        "
                        class="action mark-answer"
                        :class="{
                          marked: answer.correct === true,
                          hidden: drag === true && answer.correct === false,
                        }"
                        @click="markAnswer(index)"
                      >
                        <img src="~/assets/icons/check-circle.svg" />
                      </div>
                    </li>
                  </transition-group>
                </draggable>
                <div
                  v-if="quizData.answerOptions.length < 5"
                  class="add-option"
                  @click="addOption"
                >
                  + Add Option
                </div>
              </div>

              <div class="explanation">
                <div class="title">3. Provide an explanation</div>
                <textarea
                  v-model="quizData.explanation"
                  placeholder="Explain why the chosen option is the correct answer."
                  rows="4"
                />
              </div>

              <div class="tags">
                <div class="title">4. Select a category</div>
                <select v-model="quizData.tags">
                  <option v-for="(tag, index) in tags" :key="index">
                    {{ tag }}
                  </option>
                </select>
              </div>

              <div class="row-center">
                <Button bg="primary" @click.native.prevent="createQuiz">
                  Create Quiz
                </Button>
              </div>
            </form>
          </section>
        </div>
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
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
          { text: "", correct: false },
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
        const res = await this.$axios.post(`${process.env.baseURL}/class/tag`, {
          code: this.$route.params.courseCode,
        });
        this.tags = res.data.tags;
        this.quizData.tags = res.data.tags[0];
      } catch (e) {
        console.log(e);
      }
    },

    createQuiz() {
      const e = this.checkForm();
      if (e !== "e") {
        try {
          this.quizData.answer = this.quizData.answerOptions.findIndex(
            obj => obj.correct === true,
          );

          const newAnswerOptions = [];
          for (let i = 0; i < this.quizData.answerOptions.length; i++) {
            newAnswerOptions.push(this.quizData.answerOptions[i].text);
          }
          this.quizData.answerOptions = newAnswerOptions;

          const quizData = this.quizData;
          const classId = this.$route.params.courseCode;

          this.$axios
            .post(`${process.env.baseURL}/class/question/create`, {
              quizData,
              classId,
            })
            .then(res => {
              this.closeQuizModal();
            });
        } catch (e) {
          console.error(e);
        }
      }
    },

    addOption() {
      if (this.quizData.answerOptions.length >= 5) {
        alert("You can only create up to 5 answer options.");
      } else {
        this.quizData.answerOptions.push({ text: "", correct: false });
      }
    },

    deleteOption(index) {
      if (this.quizData.answerOptions.length <= 2) {
        alert("You must provide at least two answer options.");
      } else {
        this.quizData.answerOptions.splice(index, 1);
      }
    },

    markAnswer(index) {
      for (let i = 0; i < this.quizData.answerOptions.length; i++) {
        this.quizData.answerOptions[i].correct = false;
      }

      this.quizData.answerOptions[index].correct = true;
    },

    checkForm() {
      if (
        this.quizData.qStem === null ||
        this.quizData.qStem.match(/^\s*$/) !== null
      ) {
        alert("Please fill in the question text.");
        return "e";
      }

      const correctAnswerMarked = this.quizData.answerOptions.find(
        obj => obj.correct === true,
      );
      const blankAnswerOptionExists = this.quizData.answerOptions.find(
        obj => obj.text === "",
      );
      if (blankAnswerOptionExists !== undefined) {
        alert("Please fill in any blank answer options.");
        return "e";
      }
      if (correctAnswerMarked === undefined) {
        alert("Please mark the correct answer among the options.");
        return "e";
      }

      if (
        this.quizData.explanation === null ||
        this.quizData.explanation.match(/^\s*$/) !== null
      ) {
        alert(
          "Please add an explanation about why the chosen option is the correct answer.",
        );
        return "e";
      }
    },
  },
};
</script>

<style src="./QuizModal.scss" lang="scss" scoped />
