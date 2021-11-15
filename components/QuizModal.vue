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
      const self = this;

      try {
        const quizData = this.quizData;
        const classId = this.$route.params.courseCode;
        await this.$axios
          .post("http://localhost:8080/class/question/create", {
            quizData,
            classId,
          })
          .then(res => {
            console.log("quiz ID", res.data);
            self.closeQuizModal();
          });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style src="./QuizModal.scss" lang="scss" scoped />
