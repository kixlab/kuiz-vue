<template>
  <div class="quiz">
    <div class="outer-wrapper column-center">
      <div
        class="title clickable"
        @click="
          () => {
            $router.push('/' + $route.params.courseCode + '/quizzes');
          }
        "
      >
        <img src="~/assets/icons/arrow-back-black.svg" class="go-back" />
        <div>Back to list</div>
      </div>
      <Wrapper rounded shadow px="0" py="0" class="inner-wrapper column">
        <section class="quiz-content">
          <div class="header">
            <div class="profile">
              <div class="profile-image">
                <img
                  class="avatar"
                  :src="data.authorImg"
                />
              </div>
              <div>
                <div class="name">{{ data.authorName }}</div>
                <div class="date">{{ data.createdAt }}</div>
              </div>
            </div>
            <!--
            <div class="more">
              <img
                src="~assets/icons/more-horizontal.svg"
                @click="
                  () => {
                    moreActionsVisible = !moreActionsVisible;
                  }
                "
              />
              <Wrapper
                v-if="moreActionsVisible"
                rounded
                shadow
                px="2"
                py="2"
                class="more-actions"
              >
                <div>Edit</div>
                <div>Delete</div>
              </Wrapper>
            </div>
            -->
          </div>
          <div class="body">
            <div class="metadata">
              <div class="tags">
                <Tag v-for="(tag, index) in data.tags" :key="index">
                  {{ tag }}
                </Tag>
              </div>
              <div class="correct-ratio text-center">
                <img src="~assets/icons/circle-check.svg" />
                {{ ratio }}% of students got the correct answer on their first try.
              </div>
            </div>

            <div class="question-text">
              {{ data.qStem }}
            </div>
            <div
              class="question-image"
              @click="toggleModal({ mode: 'image', imageURL: imageURL })"
            >
              <div class="overlay">
                <img src="~assets/icons/zoom-in-white.svg" />
              </div>
              <img :src="imageURL" />
            </div>
            <div class="answer-list">
              <div
                v-for="(answer, index) in data.answerOptions"
                :key="index"
                class="answer-item"
                :class="colorAnswer(index)"
                @click="
                  () => {
                    selectedAnswer = index;
                  }
                "
              >
                <RadioSelect :selected="selectedAnswer === index"></RadioSelect>
                <span class="answer-text">{{ answer }}</span>
              </div>
            </div>
            <div v-if="!isSolved" class="row-center check-answer">
              <Button
                bg="primary"
                @click.native="checkAnswer"
              >
                Check Answer
              </Button>
            </div>
            <transition
              name="custom-classes-transition"
              enter-active-class="animated flipInX"
              leave-active-class="animated flipOutX"
            >
              <Wrapper v-if="isSolved" rounded bg="light" class="explanation">
                <div class="exp-title">
                  <img src="~assets/images/text-balloon.png" />
                  <div>Author's explanation</div>
                </div>
                <div class="exp-text">{{ data.explanation }}</div>
              </Wrapper>
            </transition>
            <transition
              name="custom-classes-transition"
              enter-active-class="animated flipInX"
              leave-active-class="animated flipOutX"
            >
              <div v-if="isSolved" class="row-center" style="margin-top: 32px">
                <div class="like-text">Was this quiz helpful to you?</div>
                <Button
                  :px="6"
                  rounded
                  shadow
                  class="like"
                  :class="{ liked: isLiked }"
                  @click.native="onLike"
                >
                  <img
                    v-if="isLiked"
                    src="~/assets/icons/like-solid-outline.svg"
                  />
                  <img v-else src="~/assets/icons/like-outline.svg" />
                  {{ data.likes.length }}
                </Button>
              </div>
            </transition>
          </div>
        </section>
        <div
          v-if="!showComments"
          class="show-comments"
          @click="
            () => {
              showComments = true;
            }
          "
        >
          Are you having trouble solving the quiz?
        </div>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
        >
          <section v-if="showComments" class="comments">
            <div class="title">Comments</div>
            <div class="comment-list">
              <Comment
                v-for="(comment, index) in data.comment"
                :key="index"
                :name="comment.name"
                :date="comment.date"
                :body="comment"
                :class="{ 'my': comment.name === 'Elliot Jung' }"
              />
            </div>
            <div class="row reply">
              <textarea placeholder="Write a comment..." rows="2" />
              <div class="submit row-center" @click="onSubmit">
                <img src="~/assets/icons/send-white.svg" />
              </div>
            </div>
          </section>
        </transition>
      </Wrapper>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      data: {},
      imageURL: "https://i.ibb.co/QDpF9YV/quiz-example.png",
      selectedAnswer: 0,
      moreActionsVisible: false,
      isSolved: false,
      isLiked: false,
      showComments: false,
      ratio: 0,
      solvedData: [],
    };
  },

  created() {
    this.getQuizData();
  },
  updated() {
    // this.getQuizData();
  },
  methods: {
    ...mapMutations(["toggleModal"]),
    async checkAnswer() {
      try {
        this.isSolved = !this.isSolved;
        this.showComments = true;
        const res = await this.$axios.post(
          "http://localhost:8080/class/question/solve",
          {
            uid: this.$store.state.uid,
            qid: this.$route.params.quizId,
            selectedAnswer: this.selectedAnswer,
          },
        );
        console.log("ratio", res.data.ratio);
        this.ratio = Math.round((res.data.ratio.correct * 1.0) / res.data.ratio.solved * 100);
        this.data.solved = res.data.solved;
      } catch (e) {

      }
    },
    async getQuizData() {
      try {
        const res = await this.$axios.get(
          "http://localhost:8080/class/question/load",
          {
            params: {
              code: this.$route.params.courseCode,
            },
          },
        );
        const quizId = this.$route.params.quizId;
        this.data = res.data.questions.questionDatas.find(
          obj => obj._id === quizId,
        );
        this.isLiked = res.data.questions.questionDatas.find(
          obj => obj._id === quizId,
        ).likes.includes(this.$store.state.uid);
        const correct = this.data.solved.filter(e => e.selected === this.data.answer);
        console.log("solved", this.data.solved);
        this.ratio = Math.round((1.0 * correct.length) / this.data.solved.length * 100);
      } catch (e) {
        console.log(e);
      }
    },

    colorAnswer(index) {
      if (this.isSolved) {
        if (index === this.data.answer) {
          return "correct";
        } else if (index === this.selectedAnswer) {
          return "wrong";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    onSubmit() {
      alert("onSubmit alert box for testing");
    },
    async onLike() {
      try {
        console.log("isLiked1", this.isLiked);
        console.log("likedData1", this.data.likes);
        const res = await this.$axios.post(
          "http://localhost:8080/user/question/like", {
            qid: this.$route.params.quizId,
            uid: this.$store.state.uid,
            liked: this.isLiked,
          },
        );
        this.data.likes = res.data.likes;
        this.isLiked = res.data.isLiked;
        console.log("isLiked!", res.data.isLiked);
        console.log("likedData2", res.data.likes);
      } catch (e) {
        console.log("error in onLike", e);
      }
    },
    async getLike() {
      try {
        const res = await this.$axios.get(
          "http://localhost:8080/class/question/likes",
          {
            qid: this.$route.params.quizId,
          },
        );
        this.data.likes = res.likes;
        this.isLiked = res.isLiked;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/styles/colors.scss";

.quiz {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 48px 36px;
  overflow: auto;

  .outer-wrapper {
    margin: 0 auto;

    .title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      align-self: flex-start;

      &.clickable {
        padding: 6px 12px 6px 6px;

        &:hover {
          cursor: pointer;
          background-color: $grey-silver;
          border-radius: 12px;
        }

        .go-back {
          width: 28px;
          height: 28px;
          padding: 4px;
          margin-right: 4px;
        }
      }
    }

    .inner-wrapper {
      margin-top: 16px;
      padding: 20px;

      section {
        &.quiz-content {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          max-width: 720px;

          .header {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .profile {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;

              .profile-image {
                display: flex;
                width: 42px;
                height: 42px;
                margin-right: 8px;

                .avatar {
                  width: 100%;
                  height: 100%;
                  border: 1px solid $grey-silver;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }

              .name {
                font-weight: 600;
                font-family: "Poppins", sans-serif;
              }

              .date {
                font-size: 0.9rem;
                color: $grey-primary;
              }
            }

            .more {
              width: 38px;
              height: 38px;
              display: flex;
              flex-direction: column-reverse;
              align-items: center;

              img {
                width: 100%;
                height: 100%;
                padding: 4px;

                &:hover {
                  background-color: $grey-silver;
                  cursor: pointer;
                  border-radius: 50%;
                }
              }

              .more-actions {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                width: auto !important;
                margin-bottom: -126px;
                z-index: 999;

                div {
                  font-weight: 500;
                  font-family: "Poppins", sans-serif;
                  text-align: center;
                  width: 100%;
                  padding: 4px 8px;
                  border-radius: 6px;

                  &:hover {
                    background-color: $grey-silver;
                    cursor: pointer;
                  }

                  &:not(:first-child) {
                    margin-top: 4px;
                  }
                }
              }
            }
          }

          .body {
            > div {
              margin-top: 20px;

              &.metadata {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;

                .tags {
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                }

                .correct-ratio {
                  font-size: 0.8rem;
                  color: $grey-primary;

                  img {
                    height: 15px;
                    padding-bottom: 1px;
                  }
                }
              }

              &.question-text {
                font-weight: 500;
              }

              &.question-image {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                max-height: 300px;
                position: relative;
                overflow: hidden;
                border: 1px solid $grey-silver;

                &:hover {
                  .overlay {
                    opacity: 0.5;
                    cursor: pointer;
                  }
                }

                .overlay {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  background-color: $black-primary;
                  opacity: 0;

                  img {
                    height: 64px;
                  }
                }

                > img {
                  width: 100%;
                }
              }

              &.answer-list {
                display: flex;
                flex-flow: column nowrap;

                .answer-item {
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                  padding: 6px 12px;
                  border-radius: 6px;

                  &.correct {
                    background-color: $green-light;
                    transition: all 0.5s ease;
                  }

                  &.wrong {
                    background-color: $red-light;
                    transition: all 0.5s ease;
                  }

                  &:not(.correct):not(.wrong):hover {
                    background-color: $white-background;
                  }

                  &:hover {
                    cursor: pointer;
                  }

                  &:not(:first-child) {
                    margin-top: 2px;
                  }

                  .answer-text {
                    margin-left: 12px;
                  }
                }
              }

              &.check-answer {
                margin-top: 32px;
              }

              &.explanation {
                border: 2px solid $blue-primary;

                .exp-title {
                  display: flex;
                  flex-flow: row nowrap;
                  align-items: center;
                  font-weight: 600;
                  font-family: "Poppins", sans-serif;

                  img {
                    height: 20px;
                    margin-right: 8px;
                  }
                }

                .exp-text {
                  margin-top: 8px;
                }
              }
            }

            .like-text {
              font-size: 0.9rem;
              color: $grey-primary;
            }

            .like {
              background-color: $white-flat;
              margin-left: 24px;

              &:not(.liked):hover {
                background-color: $grey-silver;
              }

              &.liked {
                color: $white-flat;
                background-color: $blue-primary !important;
              }
            }
          }
        }

        &.comments {
          padding-top: 32px;
          animation-duration: 0.4s;

          .comment-list {
            width: 100%;
            padding: 0 6px;
            margin-top: 20px;
          }

          .reply {
            justify-content: space-between;
            width: 100%;
            margin-top: 20px;

            textarea {
              width: 100%;
              border: 1px solid $grey-ash;
              padding: 10px 12px;
              resize: none;
              font-size: 0.9rem;
              border-top-left-radius: 12px;
              border-bottom-left-radius: 12px;

              &:focus {
                border: 1px solid $blue-primary;
              }

              &::-webkit-scrollbar {
                display: none;
              }
            }

            .submit {
              width: 62px;
              height: 62px;
              background-color: $blue-primary;
              border-top-right-radius: 12px;
              border-bottom-right-radius: 12px;
              cursor: pointer;

              img {
                height: 24px;
              }
            }
          }
        }
      }

      .show-comments {
        font-size: 0.8rem;
        font-weight: 500;
        color: $grey-primary;
        text-align: center;
        letter-spacing: 0.025em;
        padding: 8px 0;
        background-color: #f2f5f8;
        margin-top: 32px;

        &:hover {
          background-color: $grey-silver;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
