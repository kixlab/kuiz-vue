<template>
  <div class="wrapper column-center">
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.wrapper {
  width: 100vw;
  height: 100vh;
  @include mbd(md) {
    height: calc(100vh - 100px);
  }
  @include mbd(xs) {
    height: calc(100vh - 50px);
  }
}
</style>
