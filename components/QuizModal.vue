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
            <div class="question-image">
              <div class="overlay">
                <img src="~assets/icons/zoom-in-white.svg" />
              </div>
              <img src="https://i.ibb.co/QDpF9YV/quiz-example.png" />
            </div>
            <div class="answer-list">
              <div
                v-for="(answer, index) in answers"
                :key="index"
                class="answer-item"
              >
                <RadioSelect></RadioSelect>
                <span class="answer-text">{{ answer }}</span>
              </div>
            </div>

            <Wrapper rounded bg="light" class="explanation">
              <div class="exp-title">
                <img src="~assets/images/text-balloon.png" />
                <div>Author's explanation</div>
              </div>
              <div class="exp-text">{{ explanation }}</div>
            </Wrapper>
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
      answers: [
        "The balance reading would decrease",
        "The balance reading would increase",
        "The balance reading would stay the same",
        "The balance reading would increase for a few seconds and then go back to its original reading",
      ],
      explanation:
        "The direction of the force on the wire is given by the right-hand rule. The current is into the page and the magnetic field is to the right. By the right-hand rule, the force on the wire is then downwards. Newton's 3rd law says the force of the wire on the magnet is therefore upwards. Since the magnitude of the Lorentz force is given by F = IL x B, increasing the current will also increase the force of the wire on the magnet, directed upwards, so the balance reading would decrease.",
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
  },
};
</script>

<style src="./QuizModal.scss" lang="scss" scoped />
