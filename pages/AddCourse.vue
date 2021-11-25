<template>
  <div class="content-wrapper">
    <Wrapper py="0" bg="transparent">
      <img src="~assets/images/logo.png" style="height: 24px" />
    </Wrapper>
    <Wrapper rounded shadow py="6" style="margin-top: 32px">
      <AddCourse />
    </Wrapper>
  </div>
</template>

<script>
export default {
  layout: "login",
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 100%;
  max-width: 480px;
}
</style>
