<template>
  <Wrapper rounded shadow class="objective-list">
    <Wrapper px="3" class="title">
      <img src="~assets/images/objective.png" />
      <span>Objectives</span>
    </Wrapper>
    <div class="column" style="margin-top: 8px">
      <ObjectiveItem />
      <ObjectiveItem />
      <ObjectiveItem />
    </div>
  </Wrapper>
</template>

<script>
export default {};
</script>

<style src="./ObjectiveList.scss" lang="scss" scoped />
