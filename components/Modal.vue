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
  },

  methods: {
    ...mapMutations(["closeModal", "toggleModal"]),
  },
};
</script>

<style src="./Modal.scss" lang="scss" scoped />
