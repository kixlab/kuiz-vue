<template>
  <div class="content-wrapper">
    <Wrapper py="0" bg="transparent">
      <img src="~assets/images/logo.png" style="height: 32px" />
    </Wrapper>
    <Wrapper rounded shadow py="5" style="margin-top: 48px">
      <Login v-if="!isSignedIn" />
      <AddCourse v-if="isSignedIn" />
    </Wrapper>
  </div>
</template>

<script>
export default {
  layout: "login",

  computed: {
    isSignedIn() {
      return this.$store.state.isSignedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  max-width: 480px;
}
</style>
