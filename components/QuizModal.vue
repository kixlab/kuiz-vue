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
          <section class="content-input column">
            <div class="createQuiz">
              <form @submit="createQuiz">
                <p>New Question: {{ quizData }}</p>
                Create Quiz Here!
                <br />
                qStem :
                <input v-model="quizData.qStem" placeholder="edit me" />
                tags :
                <input v-model="quizData.tags" placeholder="edit me" />
                explanation :
                <input v-model="quizData.explanation" placeholder="edit me" />
                <br />
                answer options
                <br />
                1 :
                <input
                  v-model="quizData.answerOptions[0]"
                  placeholder="edit me"
                />
                <br />
                2 :
                <input
                  v-model="quizData.answerOptions[1]"
                  placeholder="edit me"
                />
                <br />
                3 :
                <input
                  v-model="quizData.answerOptions[2]"
                  placeholder="edit me"
                />
                <br />
                4 :
                <input
                  v-model="quizData.answerOptions[3]"
                  placeholder="edit me"
                />
                answer :
                <input v-model.number="quizData.answer" placeholder="edit me" />
                <input type="submit" value="Submit" />
              </form>

              <div class="col-6">
                <h3>Transition</h3>
                <draggable
                  v-model="list"
                  class="list-group"
                  tag="ul"
                  v-bind="dragOptions"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <transition-group
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                  >
                    <li
                      v-for="element in list"
                      :key="element.order"
                      class="list-group-item"
                    >
                      <img src="~/assets/icons/menu-black.svg" />
                      {{ element.name }}
                    </li>
                  </transition-group>
                </draggable>
              </div>
            </div>
          </section>
          <section class="guide column"></section>
        </Wrapper>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    const message = [
      "vue.draggable",
      "draggable",
      "component",
      "for",
      "vue.js 2.0",
      "based",
      "on",
      "Sortablejs",
    ];

    return {
      quizData: {
        author: this.$store.state.uid,
        authorName: this.$store.state.userName,
        authorImg: this.$store.state.userImage,
        qStem: "",
        tags: null,
        explanation: "",
        answerOptions: [],
        answer: null,
      },
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
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
    this.getTag();
  },

  methods: {
    ...mapMutations(["closeQuizModal", "toggleQuizModal"]),

    keyDownHandler(e) {
      if (e.key === "Escape") {
        this.closeQuizModal();
      }
    },

    async getTag() {
      try {
        console.log("code", this.$route.params.courseCode);
        const res = await this.$axios.post("http://localhost:8080/class/tag", {
          code: this.$route.params.courseCode,
        });
        this.tags = res.data.tags;
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
