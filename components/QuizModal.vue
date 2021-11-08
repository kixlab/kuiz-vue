<template>
  <transition name="fade">
    <div
      v-if="quizModalVisible"
      style="animation-duration: 0.3s"
      class="modal"
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
// import draggable from "vuedraggable";

export default {
  data() {
    return {
      quizData: {
        author: this.$store.state.uid,
        qStem: "",
        tags: null,
        explanation: "",
        answerOptions: [],
        answer: null,
      },
    };
  },

  computed: {
    quizModalVisible() {
      return this.$store.state.quizModalVisible;
    },
  },

  mounted() {
    window.addEventListener("keydown", this.keyDownHandler);
  },

  destroyed() {
    window.removeEventListener("keydown", this.keyDownHandler);
  },

  methods: {
    ...mapMutations(["closeQuizModal", "toggleQuizModal"]),

    keyDownHandler(e) {
      if (e.key === "Escape") {
        this.closeQuizModal();
      }
    },

    async createQuiz() {
      try {
        console.log("this is quizData", this.quizData);
        const quizData = this.quizData;
        const classId = this.$route.params.courseCode;
        const rs = await this.$axios.post(
          "http://localhost:8080/class/question/create",
          {
            quizData,
            classId,
          },
        );
        console.log("rs!!", rs);
      } catch (e) {
        console.log("error in createQuiz function");
        console.error(e);
      }
    },
  },
};
</script>

<style src="./QuizModal.scss" lang="scss" scoped />
