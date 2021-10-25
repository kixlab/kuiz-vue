<template>
  <transition name="fade">
    <div
      v-if="modalVisible"
      style="animation-duration: 0.3s"
      class="modal"
      @click="closeModal"
    >
      <img
        v-if="modalIsImage"
        :src="modalImageURL"
        style="width: 100%; height: 100%; object-fit: contain"
      />
      <Wrapper
        v-else
        rounded
        shadow
        py="6"
        class="content-wrapper"
        @click.native.stop
      >
        <img src="~/assets/images/modal-badge.png" class="badge" />
        <img
          v-if="modalIsAddCourse"
          src="~/assets/icons/arrow-back-black.svg"
          class="go-back"
          @click="toggleModal({ mode: 'select-course' })"
        />
        <AddCourse v-if="modalIsAddCourse" />
        <SelectCourse v-if="modalIsSelectCourse" />
      </Wrapper>
    </div>
  </transition>
</template>

<script>
import { mapMutations } from "vuex";

export default {
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

    modalIsImage() {
      return this.$store.state.modalIsImage;
    },

    modalImageURL() {
      return this.$store.state.modalImageURL;
    },
  },

  methods: {
    ...mapMutations(["closeModal", "toggleModal"]),
  },
};
</script>

<style src="./Modal.scss" lang="scss" scoped />
