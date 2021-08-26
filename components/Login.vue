<template>
  <div class="inner-wrapper">
    <Wrapper class="title">Welcome to ServiceName</Wrapper>
    <Wrapper px="6" py="0" class="description">
      You can sign in or register with your Google account.
    </Wrapper>
    <Wrapper px="6" style="margin: 64px 0">
      <Wrapper
        rounded
        shadow
        class="row login"
        @click.native="loginWithGoogle()"
      >
        <div style="padding: 0 8px">
          <img src="~assets/images/brand-google.png" />
        </div>
        <div class="text">Sign in with Google</div>
      </Wrapper>
    </Wrapper>
  </div>
</template>

<script>
import GoogleSignInButton from "vue-google-signin-button-directive";
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["logIn"]),

    loginWithGoogle() {
      this.$auth.loginWith("google");
    },

    async signIn() {
      try {
        const authCode = await this.$gAuth.getAuthCode();
        this.$axios.post("http://localhost:8080/auth/register", {
          code: authCode,
          redirect_uri: "http://localhost:3000/quizzes",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
