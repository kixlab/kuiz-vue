<template>
  <div class="inner-wrapper">
    <Wrapper class="modal-title">Select A Course</Wrapper>
    <div class="column">
      <Wrapper
        v-for="(course, index) in courses"
        :key="index"
        rounded
        px="3"
        class="course-item row"
        @click.native="
          () => {
            selectedCourse = index;
          }
        "
      >
        <div class="column" style="max-width: calc(100% - 36px)">
          <div class="course-metadata">
            <span class="course-code">{{ course.code }}</span>
            <span>&nbsp;|&nbsp;</span>
            <span class="course-instructor">Prof. {{ course.instructor }}</span>
          </div>
          <div class="course-title">
            {{ course.title }}
          </div>
        </div>
        <div class="column-center">
          <RadioSelect :selected="selectedCourse === index" no-padding />
        </div>
      </Wrapper>
      <Wrapper px="3">
        <Wrapper
          rounded
          class="add-course row-center"
          @click.native="toggleModal({ mode: 'add-course' })"
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
      <Wrapper class="row-center">
        <Button class="w-100" @click.native="closeModal">Cancel</Button>
        <Button class="w-100" bg="primary" @click.native="closeModal">
          Confirm
        </Button>
      </Wrapper>
    </div>
  </div>
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
      selectedCourse: 0,
    };
  },

  methods: {
    ...mapMutations(["closeModal", "toggleModal"]),
  },
};
</script>

<style src="./SelectCourse.scss" lang="scss" scoped />
