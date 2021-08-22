<template>
  <div class="inner-wrapper">
    <Wrapper class="title">Welcome to ServiceName</Wrapper>
    <Wrapper px="6" py="0" class="description">
      You can sign in or register with your Google account.
    </Wrapper>
    <Wrapper px="6" style="margin: 64px 0">
      <Wrapper rounded shadow class="row login">
        <div style="padding: 0 8px">
          <img src="~assets/images/brand-google.png" />
        </div>
        <div class="text" @click="logIn">Sign in with Google</div>
      </Wrapper>
    </Wrapper>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["logIn"]),
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
