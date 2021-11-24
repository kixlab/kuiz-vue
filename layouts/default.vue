<template>
  <div class="wrapper">
    <div class="small-screen">
      <img src="~/assets/images/small-screen-cover.png" />
      <div class="text-center">
        Sorry, Kuiz is only available on your computer at the moment. An update
        is on its way to provide you with a seamless mobile experience!
      </div>
    </div>
    <Modal />
    <QuizModal />
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

  .small-screen {
    @include mbd(md) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    display: none;
    position: absolute;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: #73b9ff;

    img {
      width: 72vw;
      max-width: 360px;
    }

    div {
      @include mbd(xs) {
        font-size: 1rem;
      }
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      font-size: 1.2rem;
      color: #ffffff;
      line-height: 1.4;
      width: 80%;
      margin-top: 24px;
    }
  }

  .placeholder {
    width: 100%;
    max-width: 260px;
    height: 100%;
  }
}
</style>
