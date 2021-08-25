<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/styles/colors.scss";

.tag {
  padding: 2px 8px;
  border-radius: 6px;
  background-color: $orange-light;
  font-size: 13px;

  &:not(:first-child) {
    margin-left: 8px;
  }
}
</style>
