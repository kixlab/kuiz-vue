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

export default {
  data() {
    return {
      signedIn: false,
      userName: null,
      userEmail: null,
      userImage: null,
      classes: null,
    };
  },

  methods: {
    ...mapMutations(["logIn"]),

    async handleLogin() {
      try {
        const GoogleUser = await this.$gAuth.signIn();

        if (!GoogleUser.isSignedIn()) {
          throw new Error("로그인에 실패했습니다.");
        }

        const res = await this.$axios.post(
          "http://localhost:8080/auth/register",
          {
            name: GoogleUser.getBasicProfile().getName(),
            email: GoogleUser.getBasicProfile().getEmail(),
          },
        );

        const userInfo = {
          uid: res.data.user._id,
          userEmail: this.userEmail,
          userName: this.userName,
          userImage: this.userImage,
          classes: res.data.user.classes,
          currentCourse: "",
        };

        console.log(userInfo);

        if (res.data.user.classes.length > 0) {
          userInfo.currentCourse = res.data.user.classes[0];
          this.$store.commit("logIn", userInfo);
          this.$router.push("/" + res.data.user.classes[0]);
        } else {
          console.log("no class!");
          this.$store.commit("logIn", userInfo);
          this.$router.push("/AddCourse");
        }
      } catch (e) {
        console.log("error in Login.vue");
        console.error(e);
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
