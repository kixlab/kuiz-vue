<template>
  <Wrapper class="navbar">
    <NuxtLink to="/" class="logo">
      <img src="~/assets/images/logo.png" />
    </NuxtLink>
    <!--
    <Wrapper
      rounded
      class="row w-100 course-select"
      @click.native="toggleModal({ mode: 'select-course' })"
    >
      <div class="column" style="max-width: calc(100% - 18px)">
        <div class="course-code">
          EE488&nbsp;&nbsp;|&nbsp;&nbsp;Prof. Daehsik Kim
        </div>
        <div class="course-title">Brain, Machines, and Societies</div>
      </div>
      <div class="column-center">
        <img src="~/assets/icons/arrow-dropdown-black.svg" />
      </div>
    </Wrapper>
    -->
    <div style="width: 100%; height: 64px"></div>
    <Wrapper px="0" py="0" class="column">
      <NavItem rounded to="quizzes">Quizzes</NavItem>
      <NavItem rounded to="activity">My Activity</NavItem>
      <NavItem rounded to="participants">Participants</NavItem>
      <!-- <NavItem rounded to="/notifications">Notifications</NavItem> -->
      <NavItem rounded to="settings">Settings</NavItem>
      <div class="divider"></div>
      <Wrapper rounded class="logout" @click.native="logOut">
        <img src="~/assets/icons/logout-black.png" />
        <span style="margin-left: 12px">Log Out</span>
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
