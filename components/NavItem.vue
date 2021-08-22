<template>
  <router-link :to="linkTo" :class="buildClass">
    <img
      v-if="$route.path == to || $route.path == to + '/'"
      :src="require('~/assets/icons' + to + '-white.svg')"
    />
    <img v-else :src="require('~/assets/icons' + to + '-black.svg')" />
    <span style="margin-left: 16px"><slot /></span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: { type: String, default: "#" },
    px: { type: Number, default: 4 },
    py: { type: Number, default: 4 },
    bg: { type: String, default: null },
    rounded: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
  },

  computed: {
    linkTo() {
      if (this.to === "/logout") {
        return "#";
      } else {
        return this.to;
      }
    },

    buildClass() {
      let className = "wrapper nav-item";

      if (this.px) {
        className += " px-" + this.px;
      }

      if (this.py) {
        className += " py-" + this.py;
      }

      if (this.bg === "primary") {
        className += " bg-primary";
      }

      if (this.rounded) {
        className += " rounded";
      }

      if (this.shadow) {
        className += " shadow";
      }

      return className;
    },
  },
};
</script>

<style src="./NavItem.scss" lang="scss" scoped></style>
