<template>
  <div class="radio-select">
    <img
      v-if="selected"
      class="select"
      :class="{ 'no-padding': noPadding }"
      src="~/assets/icons/select-active.svg"
    />
    <img
      v-else
      class="select"
      :class="{ 'no-padding': noPadding }"
      src="~/assets/icons/select-inactive.svg"
    />
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: { type: Boolean, default: false },
    noPadding: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
.radio-select {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  .select {
    height: 20px;
    padding: 0 12px;

    &.no-padding {
      padding: 0;
    }
  }
}
</style>
