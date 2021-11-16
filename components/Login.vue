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
      userName: null,
      userEmail: null,
      userImage: null,
      classes: null,
    };
  },

  methods: {
    ...mapMutations(["changeCourse", "logIn"]),

    async handleLogin() {
      try {
        const GoogleUser = await this.$gAuth.signIn();

        if (!GoogleUser.isSignedIn()) {
          throw new Error("로그인에 실패했습니다.");
        }

        this.userName = GoogleUser.getBasicProfile().getName();
        this.userImage = GoogleUser.getBasicProfile().getImageUrl();
        this.userEmail = GoogleUser.getBasicProfile().getEmail();

        this.$axios
          .post("http://localhost:8080/auth/register", {
            name: this.userName,
            email: this.userEmail,
            image: this.userImage,
          })
          .then(res => {
            const userInfo = {
              uid: res.data.user._id,
              userEmail: this.userEmail,
              userName: this.userName,
              userImage: this.userImage,
              classes: res.data.user.classes,
              sid: res.data.user.sid,
            };

            this.$store.commit("logIn", userInfo);

            if (res.data.user.classes.length > 0) {
              this.$store.commit("changeCourse", res.data.user.classes[0]);
              this.$router.push("/" + res.data.user.classes[0]);
            } else {
              this.$router.push("/AddCourse");
            }
          });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
