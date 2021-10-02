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
    <div>
      <p> 로그인 여부: {{signedIn}}</p>
      <img :src="userImage" width="50" height="50"/>
      <p> 로그인 사용자 이름: {{ userName }} </p>
      <p> 로그인 사용자 이메일: {{ userEmail }} </p>
    </div>
    <button
      :disabled="!token"
      @click.native="handleLogout"
    >Sign Out</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    signedIn: false,
    userName: null,
    userEmail: null,
    userImage: null,
  }),
  methods: {
    clear() {
      this.signedIn = null;
      this.userName = null;
      this.userImage = null;
      this.userEmail = null;
    },

    ...mapMutations(["logIn"]),
    async handleLogin() {
      try {
        const GoogleUser = await this.$gAuth.signIn();
        if (!GoogleUser.isSignedIn()) { throw new Error("로그인에 실패했습니다."); };
        this.signedIn = GoogleUser.isSignedIn();
        this.userName = GoogleUser.getBasicProfile().getName();
        this.userImage = GoogleUser.getBasicProfile().getImageUrl();
        this.userEmail = GoogleUser.getBasicProfile().getEmail();
        let rs = await this.$axios.post('http://localhost:8080/auth/register',{name:this.userName,email:this.userEmail})
        console.log("class",rs.data.user.classes);
        if(rs.data.user.classes.length){
          //this.$store.commit('logIn');
          this.$router.push("/quizzes");
        } else{
          console.log("no class!")
          const userInfo = {userEmail:this.userEmail, userName : this.userName, _id : this._id}
          console.log("userInfo",this.userEmail, this.userName)
          this.$store.commit('logIn',userInfo);
          //this.$router.push("/quizzes");
        }
      } catch (e) {
        console.log("error in Login.vue");
        console.error(e);
      }
    },
    async handleLogout() {
      try {
        await this.$gAuth.signOut();
        this.clear();
      } catch (e) {
        console.error(e);
      } finally {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
