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
                <img class="avatar" :src="quizData.authorImg" />
              </div>
              <div>
                <div class="name">{{ quizData.authorName }}</div>
                <div class="date"><Date :date="quizData.createdAt" /></div>
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
                <Tag v-for="(tag, index) in quizData.tags" :key="index">
                  {{ tag }}
                </Tag>
              </div>
              <div class="correct-ratio text-center">
                <img src="~assets/icons/check-circle.svg" />
                {{ ratio }}% of students got the correct answer on their first
                try.
              </div>
            </div>

            <div class="question-text">
              {{ quizData.qStem }}
            </div>
            <!--
            <div
              class="question-image"
              @click="toggleModal({ mode: 'image', imageURL: imageURL })"
            >
              <div class="overlay">
                <img src="~assets/icons/zoom-in-white.svg" />
              </div>
              <img :src="imageURL" />
            </div>
            -->
            <div class="answer-list">
              <div
                v-for="(answer, index) in quizData.answerOptions"
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
              <Button bg="primary" @click.native="checkAnswer">
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
                <div class="exp-text">{{ quizData.explanation }}</div>
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
                  {{ quizData.likes.length }}
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
                v-for="(comment, index) in quizData.comment"
                :key="index"
                :name="comment.name"
                :date="comment.createdAt"
                :body="comment.comment"
                :class="{ 'my': comment.name === $store.state.userName }"
                :img="comment.imgUrl"
              />
            </div>
            <div class="row reply">
              <textarea
                v-model="newComment"
                maxlength="1000"
                placeholder="Is the question easy to understand? What can be improved?"
                rows="2"
              />
              <div class="submit row-center" @click="onCommentSubmit">
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
      quizData: {
        answer: null,
        authorImg: "",
        authorName: "",
        answerOptions: [],
        comment: [],
        createdAt: "",
        explanation: "",
        likes: [],
        qStem: "",
        tags: [],
        solved: [],
      },
      imageURL: "https://i.ibb.co/QDpF9YV/quiz-example.png",
      selectedAnswer: null,
      moreActionsVisible: false,
      isSolved: false,
      isLiked: false,
      showComments: false,
      ratio: 0,
      newComment: "",
    };
  },

  created() {
    this.getQuizData();
  },

  methods: {
    ...mapMutations(["toggleModal"]),

    checkAnswer() {
      if (this.selectedAnswer === null) {
        alert("Please mark your answer.");
      } else {
        try {
          this.isSolved = true;
          this.showComments = true;

          this.$axios
            .post(`${process.env.baseURL}/class/question/solve`, {
              uid: this.$store.state.uid,
              qid: this.$route.params.quizId,
              selectedAnswer: this.selectedAnswer,
            })
            .then(res => {
              this.ratio = Math.round(
                ((res.data.ratio.correct * 1.0) / res.data.ratio.solved) * 100,
              );

              this.quizData.solved = res.data.solved;
            });
        } catch (e) {
          console.log(e);
        }
      }
    },

    async getQuizData() {
      try {
        await this.$axios
          .get(`${process.env.baseURL}/class/question/load`, {
            params: {
              code: this.$route.params.courseCode,
            },
          })
          .then(res => {
            const quizId = this.$route.params.quizId;

            this.quizData = res.data.questions.questionDatas.find(
              obj => obj._id === quizId,
            );

            this.isLiked = res.data.questions.questionDatas
              .find(obj => obj._id === quizId)
              .likes.includes(this.$store.state.uid);

            if (
              res.data.questions.questionDatas
                .find(obj => obj._id === quizId)
                .solved.find(obj => obj.user === this.$store.state.uid) !==
              undefined
            ) {
              this.showComments = true;
            }

            const correct = this.quizData.solved.filter(
              e => e.selected === this.quizData.answer,
            );

            if (this.quizData.solved.length !== 0) {
              this.ratio = Math.round(
                ((correct.length * 1.0) / this.quizData.solved.length) * 100,
              );
            }
          });
      } catch (e) {
        console.log(e);
      }
    },

    colorAnswer(index) {
      if (this.isSolved) {
        if (index === this.quizData.answer) {
          return "correct";
        } else if (index === this.selectedAnswer) {
          return "wrong";
        } else {
          return "";
        }
      } else if (index === this.selectedAnswer) {
        return "selected";
      } else {
        return "";
      }
    },

    async onCommentSubmit() {
      if (this.newComment === null || this.newComment.match(/^\s*$/) !== null) {
        alert("Please enter your comment.");
      } else {
        try {
          await this.$axios
            .post(`${process.env.baseURL}/class/question/comment`, {
              qid: this.$route.params.quizId,
              uid: this.$store.state.uid,
              comment: this.newComment,
            })
            .then(res => {
              this.newComment = "";
              this.getQuizData();
            });
        } catch (e) {
          console.log(e);
          throw e;
        }
      }
    },

    async onLike() {
      try {
        await this.$axios
          .post(`${process.env.baseURL}/user/question/like`, {
            qid: this.$route.params.quizId,
            uid: this.$store.state.uid,
            liked: this.isLiked,
          })
          .then(res => {
            this.getQuizData();
          });
      } catch (e) {
        console.log("error in onLike", e);
      }
    },

    async getLike() {
      try {
        const res = await this.$axios.get(
          `${process.env.baseURL}/class/question/likes`,
          {
            qid: this.$route.params.quizId,
          },
        );
        this.quizData.likes = res.likes;
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
          width: 720px;

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
            width: 100%;

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
                word-break: break-word;
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

                  &.selected {
                    background-color: $blue-light;
                    transition: all 0.3s ease;
                  }

                  &.correct {
                    background-color: $green-light;
                    transition: all 0.3s ease;
                  }

                  &.wrong {
                    background-color: $red-light;
                    transition: all 0.3s ease;
                  }

                  &:not(.correct):not(.wrong):not(.selected):hover {
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
                  word-break: break-word;
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
          border-top: 1px solid $grey-silver;
          margin-top: 32px;
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
              padding: 8px 12px;
              resize: none;
              font-size: 0.9rem;
              border-top-left-radius: 6px;
              border-bottom-left-radius: 6px;
              transition: border 0.2s ease;

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
              border-top-right-radius: 6px;
              border-bottom-right-radius: 6px;
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
        background-color: $white-background;
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
