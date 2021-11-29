<template>
  <div class="content-wrapper">
    <Wrapper py="0" bg="transparent">
      <img src="~assets/images/logo.png" style="height: 24px" />
    </Wrapper>
    <Wrapper rounded shadow py="6" style="margin-top: 32px">
      <Login />
    </Wrapper>
  </div>
</template>

<script>
export default {
  layout: "login",

  created() {
    if (
      this.$store.state.isLoggedIn &&
      this.$store.state.currentCourse !== ""
    ) {
      this.$router.push("/" + this.$store.state.currentCourse);
    }
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  max-width: 480px;
}
</style>
