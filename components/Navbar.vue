<template>
  <Wrapper class="navbar">
    <router-link to="/" class="logo">
      <img src="~/assets/images/logo.png" />
    </router-link>
    <Wrapper
      rounded
      class="row w-100 course-select"
      @click.native="toggleModal('select')"
    >
      <div class="column" style="max-width: calc(100% - 18px)">
        <div class="course-code">HSS318</div>
        <div class="course-title">Special Topics in Environmental Studies</div>
      </div>
      <div class="column-center">
        <img src="~/assets/icons/arrow-dropdown-black.svg" />
      </div>
    </Wrapper>
    <Wrapper class="column">
      <NavItem rounded to="/quizzes">Quizzes</NavItem>
      <NavItem rounded to="/notifications">Notifications</NavItem>
      <NavItem rounded to="/settings">Settings</NavItem>
    </Wrapper>
  </Wrapper>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      toggleModal: "toggleModal",
    }),
  },
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
