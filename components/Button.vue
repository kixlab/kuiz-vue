<template>
  <button class="button" :class="buildClass"><slot /></button>
</template>

<script>
export default {
  props: {
    px: { type: Number, default: 4 },
    py: { type: Number, default: 4 },
    bg: { type: String, default: null },
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

      return className;
    },
  },
};
</script>

<style src="./Button.scss" lang="scss" scoped></style>
