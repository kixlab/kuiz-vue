<template>
  <button :class="buildClass" class="button">
    <img
      v-if="icon !== null && bg === 'primary'"
      :src="require('~/assets/icons/' + icon + '-white.svg')"
    />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    px: { type: Number, default: 3 },
    py: { type: Number, default: 3 },
    bg: { type: String, default: null },
    icon: { type: String, default: null },
    slim: { type: Boolean, default: false },
  },

  computed: {
    buildClass() {
      let className = "rounded shadow";

      if (this.px) {
        className += " px-" + this.px;
      }

      if (this.py) {
        className += " py-" + this.py;
      }

      if (this.bg === "primary") {
        className += " bg-primary";
      }

      if (this.slim) {
        className += " slim";
      }

      return className;
    },
  },
};
</script>

<style src="./Button.scss" lang="scss" scoped></style>
