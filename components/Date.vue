<template>
  <span>{{ timeFromNow }}</span>
</template>

<script>
export default {
  props: {
    date: { type: String, default: null },
  },

  computed: {
    timeFromNow() {
      return this.$dayjs(this.date).fromNow();
    },
  },
};
</script>

<style></style>
