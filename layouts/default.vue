<template>
  <div class="wrapper">
    <Modal />
    <div class="placeholder"></div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .placeholder {
    width: 100%;
    max-width: 260px;
    height: 100%;
  }
}
</style>
