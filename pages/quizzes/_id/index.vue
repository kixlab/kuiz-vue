<template>
  <div class="quiz">
    <div class="content-wrapper column-center">
      <Wrapper rounded shadow px="0" py="0" class="row">
        <section class="leading">
          <div class="title">
            <img
              src="~/assets/icons/arrow-back-black.svg"
              class="go-back"
              @click="
                () => {
                  $router.push('/quizzes');
                }
              "
            />
            <div>Back to list</div>
          </div>
          <div class="header">
            <div class="profile">
              <div class="profile-image">
                <img
                  class="avatar"
                  src="https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg"
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
                @click="toggleMoreActions"
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
              <RadioSelect
                v-for="(ans, index) in answer"
                :key="index"
                :selected="selectedAnswer === index"
                @click.native="
                  () => {
                    selectedAnswer = index;
                  }
                "
              >
                {{ ans }}
              </RadioSelect>
            </div>
            <Wrapper rounded bg="light" class="explanation">
              <div class="exp-title">
                <img src="~assets/images/text-balloon.png" />
                <div>Author's explanation</div>
              </div>
              <div class="exp-text">{{ explanation }}</div>
            </Wrapper>
          </div>
        </section>
        <section class="trailing">
          <div class="title">Comments</div>
          <div class="comment-list">
            <Comment />
            <Comment />
            <Comment />
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
      answer: [
        "The balance reading would decrease",
        "The balance reading would increase",
        "The balance reading would stay the same",
        "The balance reading would increase for a few seconds and then go back to its original reading",
      ],
      explanation:
        "The direction of the force on the wire is given by the right-hand rule. The current is into the page and the magnetic field is to the right. By the right-hand rule, the force on the wire is then downwards. Newton's 3rd law says the force of the wire on the magnet is therefore upwards. Since the magnitude of the Lorentz force is given by F = IL x B, increasing the current will also increase the force of the wire on the magnet, directed upwards, so the balance reading would decrease.",
      selectedAnswer: 0,
      imageURL: "https://i.ibb.co/QDpF9YV/quiz-example.png",
      moreActionsVisible: false,
    };
  },

  methods: {
    ...mapMutations(["toggleModal"]),

    toggleMoreActions() {
      this.moreActionsVisible = !this.moreActionsVisible;
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
  padding: 48px;
  overflow: auto;

  .content-wrapper {
    width: 100%;
    margin: 0 auto;

    .title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 19px;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      align-self: flex-start;
      width: 100%;
      padding-bottom: 20px;

      .go-back {
        width: 32px;
        height: 32px;
        padding: 4px;
        margin-right: 8px;

        &:hover {
          background-color: $grey-silver;
          cursor: pointer;
          border-radius: 50%;
        }
      }
    }

    section {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      &.leading {
        width: 66.666666%;
        padding: 20px 24px;
        border-right: 1px solid $grey-silver;

        .header {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 20px;

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
              margin-bottom: 8px;
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
          .tags {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin-top: 20px;
          }

          .question-text {
            font-weight: 500;
            margin-top: 20px;
          }

          .question-image {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-height: 300px;
            margin-top: 20px;
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
                height: 80px;
              }
            }

            > img {
              width: 100%;
            }
          }

          .answer-list {
            display: flex;
            flex-flow: column nowrap;
            margin-top: 32px;

            div:not(:first-child) {
              margin-top: 16px;
            }
          }

          .explanation {
            border: 2px solid $blue-primary;
            margin-top: 32px;

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

      &.trailing {
        width: 33.333333%;
        padding: 20px 24px;

        .comment-list {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
