<template>
  <div class="comment">
    <div class="profile-image">
      <img class="avatar" :src="img" />
    </div>
    <Wrapper rounded px="3" py="2" class="box">
      <div class="head">
        <div class="name">{{ name }}</div>
        <div class="date"><Date :date="date" /></div>
      </div>
      <div class="body">
        {{ body }}
      </div>
    </Wrapper>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: null },
    date: { type: String, default: null },
    body: { type: String, default: null },
    img: { type: String, default: "" },
  },

  computed: {
    avatarUrl() {
      if (
        this.avatar === null ||
        this.avatar === undefined ||
        this.avatar === ""
      ) {
        return require("~/assets/images/profile-default.png");
      } else {
        return this.avatar;
      }
    },
  },
};
</script>

<style src="./Comment.scss" lang="scss" scoped></style>
