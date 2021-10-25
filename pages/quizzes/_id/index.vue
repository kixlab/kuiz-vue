<template>
  <div class="quiz">
    <div class="outer-wrapper column-center">
      <div
        class="title clickable"
        @click="
          () => {
            $router.push('/quizzes');
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
                  src="https://www.kixlab.org/assets/img/members/ejung.png"
                />
              </div>
              <div>
                <div class="name">Elliot Jung</div>
                <div class="date">August 24 at 5:41 PM</div>
              </div>
            </div>
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
          </div>
          <div class="body">
            <div class="tags">
              <Tag>Magnetostatistics</Tag>
              <Tag>Lorentz force</Tag>
              <Tag>Newton's 3rd law</Tag>
            </div>
            <div class="question-text">
              Shown below is a magnet on the left placed onto an electronic
              balance that gives a reading of 115g. To the right the same magnet
              is placed on the electronic balance but a wire carrying current
              into the page is placed directly in between the north and south
              ends of the magnet. To the right the balance now reads 100g. What
              would happen if the current was increased in the wire?
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
                v-for="(answer, index) in answers"
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
                @click.native="
                  () => {
                    isSolved = !isSolved;
                  }
                "
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
                <div class="exp-text">{{ explanation }}</div>
              </Wrapper>
            </transition>
          </div>
        </section>
        <!-- <div class="show-comments">Show Comments</div> -->
        <section v-if="isSolved" class="comments">
          <div class="title">Comments</div>
          <div class="comment-list">
            <Comment
              v-for="(comment, index) in comments"
              :key="index"
              :name="comment.name"
              :date="comment.date"
              :body="comment.body"
              :class="{ 'my': comment.name === 'Elliot Jung' }"
            />
          </div>
          <div class="row reply">
            <textarea placeholder="Write a comment..." rows="2" />
            <div class="submit row-center">
              <img src="~/assets/icons/send-white.svg" />
            </div>
          </div>
        </section>
      </Wrapper>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      answers: [
        "The balance reading would decrease",
        "The balance reading would increase",
        "The balance reading would stay the same",
        "The balance reading would increase for a few seconds and then go back to its original reading",
      ],
      comments: [
        {
          name: "Jaeryoung Ka",
          date: "August 24 at 5:41 PM",
          body: "Does this mean that we will be able to lift up the magnet at some point if we keep increasing the current? Also, is the wire fixed in the air?",
        },
        {
          name: "Elliot Jung",
          date: "August 24 at 5:44 PM",
          body: "I also think we need a condition for the fixation of the wire. Assuming that it is fixed in midair, increasing the current should eventually lift up the magnet unless there's some external force.",
        },
        {
          name: "Jaeryoung Ka",
          date: "August 24 at 5:49 PM",
          body: "I see. Thanks!",
        },
      ],
      explanation:
        "The direction of the force on the wire is given by the right-hand rule. The current is into the page and the magnetic field is to the right. By the right-hand rule, the force on the wire is then downwards. Newton's 3rd law says the force of the wire on the magnet is therefore upwards. Since the magnitude of the Lorentz force is given by F = IL x B, increasing the current will also increase the force of the wire on the magnet, directed upwards, so the balance reading would decrease.",
      selectedAnswer: 0,
      correctAnswer: 0,
      imageURL: "https://i.ibb.co/QDpF9YV/quiz-example.png",
      moreActionsVisible: false,
      isSolved: false,
      showComments: false,
    };
  },

  methods: {
    ...mapMutations(["toggleModal"]),

    colorAnswer(index) {
      if (this.isSolved) {
        if (index === this.correctAnswer) {
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

              &.tags {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
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
          }
        }

        &.comments {
          padding-top: 32px;
          border-top: 1px solid $grey-silver;
          margin-top: 32px;

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
        text-transform: uppercase;
        letter-spacing: 0.025em;
        padding: 12px 0;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        background-color: #f2f5f8;

        &:hover {
          background-color: $grey-silver;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
