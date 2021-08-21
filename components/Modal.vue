<template>
  <transition name="fade">
    <div v-if="modalVisible" class="modal" @click="closeModal">
      <Wrapper rounded shadow py="5" class="content-wrapper" @click.native.stop>
        <img src="~/assets/images/modal-badge.png" class="badge" />
        <img
          v-if="modalIsAddCourse"
          src="~/assets/icons/arrow-back-black.svg"
          class="go-back"
          @click="toggleModal('select')"
        />
        <Wrapper class="modal-title">
          {{ modalIsSelectCourse ? "Select A Course" : "Enter Course Code" }}
        </Wrapper>
        <Wrapper v-if="modalIsAddCourse" px="6" py="0" class="description">
          You need a 4-digit code to join a course workspace. Check your course
          website on KLMS for related announcements or ask the instructor for
          access code.
        </Wrapper>
        <div v-if="modalIsSelectCourse" class="column">
          <Wrapper
            v-for="(course, index) in courses"
            :key="index"
            rounded
            px="3"
            class="course-item row"
          >
            <div class="column" style="max-width: calc(100% - 36px)">
              <div class="course-metadata">
                <span class="course-code">{{ course.code }}</span>
                <span>&nbsp;|&nbsp;</span>
                <span class="course-instructor">
                  Prof. {{ course.instructor }}
                </span>
              </div>
              <div class="course-title">
                {{ course.title }}
              </div>
            </div>
            <div class="column-center">
              <img src="~/assets/icons/select-active.svg" />
            </div>
          </Wrapper>
          <Wrapper px="3">
            <Wrapper
              rounded
              class="add-course row-center"
              @click.native="toggleModal('add')"
            >
              <svg
                id="add_black_24dp"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="path_68"
                  data-name="path 68"
                  d="M0,0H24V24H0Z"
                  fill="none"
                />
                <path
                  id="path_69"
                  data-name="path 69"
                  d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z"
                  fill="#888"
                />
              </svg>

              <span style="margin-left: 4px">Add Course</span>
            </Wrapper>
          </Wrapper>
        </div>
        <Wrapper
          v-if="modalIsAddCourse"
          class="row-center"
          style="margin: 48px 0"
        >
          <div class="code-input">
            <input
              v-model="code.firstDigit"
              name="First Digit"
              autocomplete="off"
              type="text"
              maxlength="1"
              inputmode="numeric"
              value=""
              @keyup="onKeyUp"
              @keydown="onKeyDown"
            />
            <input
              v-model="code.secondDigit"
              name="Second Digit"
              autocomplete="off"
              type="text"
              maxlength="1"
              inputmode="numeric"
              value=""
              @keyup="onKeyUp"
              @keydown="onKeyDown"
            />
            <input
              v-model="code.thirdDigit"
              name="Third Digit"
              autocomplete="off"
              type="text"
              maxlength="1"
              inputmode="numeric"
              value=""
              @keyup="onKeyUp"
              @keydown="onKeyDown"
            />
            <input
              v-model="code.fourthDigit"
              name="Fourth Digit"
              autocomplete="off"
              type="text"
              maxlength="1"
              inputmode="numeric"
              value=""
              @keyup="onKeyUp"
              @keydown="onKeyDown"
            />
          </div>
        </Wrapper>
        <Wrapper class="row-center">
          <Button @click.native="closeModal">Cancel</Button>
          <Button bg="primary" @click.native="closeModal">Confirm</Button>
        </Wrapper>
      </Wrapper>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      courses: [
        {
          code: "HSS318",
          instructor: "Hana Kim",
          title:
            "Special Topics in Environmental Studies <Introduction to circular economy>",
        },
        {
          code: "EE204",
          instructor: "Minseok Jang",
          title: "Electromagnetics I",
        },
        {
          code: "EE488",
          instructor: "Daeshik kim",
          title: "Brains, machines, and societies",
        },
      ],

      code: {
        firstDigit: null,
        secondDigit: null,
        thirdDigit: null,
        fourthDigit: null,
      },
    };
  },

  computed: {
    modalVisible() {
      return this.$store.state.modalVisible;
    },

    modalIsSelectCourse() {
      return this.$store.state.modalIsSelectCourse;
    },

    modalIsAddCourse() {
      return this.$store.state.modalIsAddCourse;
    },
  },

  methods: {
    ...mapMutations(["closeModal", "toggleModal"]),

    onKeyUp(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");

      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105)
      ) {
        const next = event.target.nextElementSibling;
        if (next === null) {
          return;
        }
        next.focus();
      }
    },

    onKeyDown(event) {
      if (event.keyCode === 8 && event.target.value === "") {
        const prev = event.target.previousElementSibling;
        if (prev === null) {
          return;
        }
        prev.focus();
      }
    },
  },
};
</script>

<style src="./Modal.scss" lang="scss" scoped />
