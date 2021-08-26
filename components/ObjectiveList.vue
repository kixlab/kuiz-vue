<template>
  <Wrapper rounded shadow class="objective-list">
    <Wrapper px="2" py="2" class="title">
      <img src="~assets/images/objective.png" />
      <span>Objectives</span>
    </Wrapper>
    <div class="column" style="margin-top: 8px">
      <ObjectiveItem
        v-for="(objective, index) in objectives"
        :key="index"
        :directive="objective.directive"
        :completed="objective.completed"
        :total="objective.total"
      />
    </div>
  </Wrapper>
</template>

<script>
export default {
  data() {
    return {
      objectives: [
        {
          directive: "Create 3 quizzes",
          completed: 1,
          total: 3,
        },
        {
          directive: "Solve 4 quizzes",
          completed: 2,
          total: 4,
        },
        {
          directive: "Give feedback on 5 quizzes",
          completed: 5,
          total: 5,
        },
      ],
    };
  },
};
</script>

<style src="./ObjectiveList.scss" lang="scss" scoped />
