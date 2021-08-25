<template>
  <div :class="buildClass">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    px: { type: String, default: "4" },
    py: { type: String, default: "4" },
    bg: { type: String, default: null },
    rounded: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false },
  },

  computed: {
    buildClass() {
      let className = "wrapper";

      if (this.px) {
        className += " px-" + this.px;
      }

      if (this.py) {
        className += " py-" + this.py;
      }

      if (this.bg === "primary") {
        className += " bg-primary";
      }

      if (this.bg === "light") {
        className += " bg-light";
      }

      if (this.bg === "transparent") {
        className += " bg-transparent";
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

<style src="./Wrapper.scss" lang="scss" scoped></style>
