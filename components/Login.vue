<template>
  <div class="inner-wrapper">
    <Wrapper class="title">Welcome to ServiceName</Wrapper>
    <Wrapper px="6" py="0" class="description">
      You can sign in or register with your Google account.
    </Wrapper>
    <Wrapper px="6" style="margin: 28px 0">
      <Wrapper rounded shadow class="row login" @click.native="handleLogin">
        <div style="padding: 0 8px">
          <img src="~assets/images/brand-google.png" />
        </div>
        <div class="text">Sign in with Google</div>
      </Wrapper>
    </Wrapper>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { inject, toRefs } from "vue";

export default {
  data: () => ({
  }),
  methods: {
    ...mapMutations(["logIn"]),
    async handleLogin() {
      try {
        console.log("aaa");
        const GoogleUser = await this.$gAuth.signIn();
        console.log(GoogleUser);
      } catch (e) {
        console.log("errr");
        console.error(e);
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
