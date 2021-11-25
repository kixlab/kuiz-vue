<template>
  <div class="inner-wrapper">
    <Wrapper class="title">Welcome to Kuiz!</Wrapper>
    <Wrapper px="6" py="0" class="description">
      You can sign in or register with your Google account.
    </Wrapper>
    <Wrapper px="6" style="margin: 28px 0">
      <Wrapper
        rounded
        shadow
        class="row-center login"
        :class="{ loading: loading }"
        @click.native="
          () => {
            if (!loading) {
              loading = true;
              handleLogin();
            }
          }
        "
      >
        <div v-show="loading" class="loader">
          <beat-loader size="12px" color="#ffffff" margin="3px"></beat-loader>
        </div>
        <div v-show="!loading" class="content">
          <div style="padding: 0 8px">
            <img src="~assets/images/brand-google.png" />
          </div>
          <div class="text">Sign in with Google</div>
        </div>
      </Wrapper>
    </Wrapper>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { mapMutations } from "vuex";

export default {
  components: { BeatLoader },

  data() {
    return {
      loading: false,
      userName: null,
      userEmail: null,
      userImage: null,
      classes: null,
    };
  },

  methods: {
    ...mapMutations(["changeCourse", "logIn"]),

    async handleLogin() {
      if (this.$gAuth.isInit === true) {
        try {
          const GoogleUser = await this.$gAuth.signIn();

          if (!GoogleUser.isSignedIn()) {
            throw new Error("로그인에 실패했습니다.");
          }

          this.userName = GoogleUser.getBasicProfile().getName();
          this.userImage = GoogleUser.getBasicProfile().getImageUrl();
          this.userEmail = GoogleUser.getBasicProfile().getEmail();

          this.$axios
            .post(`${process.env.baseURL}/auth/register`, {
              name: this.userName,
              email: this.userEmail,
              image: this.userImage,
            })
            .then(res => {
              const userInfo = {
                uid: res.data.user._id,
                userEmail: res.data.user.email,
                userName: res.data.user.name,
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
          this.loading = false;
        } catch (e) {
          this.loading = false;
          console.error(e);
        }
      } else {
        setTimeout(this.handleLogin, 100);
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
