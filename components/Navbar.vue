<template>
  <Wrapper class="navbar">
    <router-link to="/" class="logo">
      <img src="~/assets/images/logo.png" />
    </router-link>
    <Wrapper
      rounded
      class="row w-100 course-select"
      @click.native="toggleModal({ mode: 'select-course' })"
    >
      <div class="column" style="max-width: calc(100% - 18px)">
        <div class="course-code">EE204</div>
        <div class="course-title">Electromagnetics I</div>
      </div>
      <div class="column-center">
        <img src="~/assets/icons/arrow-dropdown-black.svg" />
      </div>
    </Wrapper>
    <Wrapper class="column">
      <NavItem rounded to="/quizzes">Quizzes</NavItem>
      <NavItem rounded to="/notifications">Notifications</NavItem>
      <NavItem rounded to="/participants">Participants</NavItem>
      <NavItem rounded to="/settings">Settings</NavItem>
      <div class="divider"></div>
      <Wrapper rounded class="logout" @click.native="logOut">
        <img src="~/assets/icons/logout-black.svg" />
        <span style="margin-left: 16px">Log Out</span>
      </Wrapper>
    </Wrapper>
  </Wrapper>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    logOut() {
      this.$store.commit("logOut");
      this.$router.push("/login");
    },

    ...mapMutations(["toggleModal"]),
  },
};
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
