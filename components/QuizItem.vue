<template>
  <tr
    @click="
      () => {
        $router.push('/quizzes/' + quizId);
      }
    "
  >
    <td class="text-center">#{{ quizId }}</td>
    <td class="question">
      <div class="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius mod
        tempor incididunt ut labore e dolor sit amet dolore magna? Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eius mod tempor
        incididunt ut labore e dolor sit amet dolore magna?
      </div>
      <div class="tags">
        <Tag>SomeTag</Tag>
        <Tag>SomeTag</Tag>
        <Tag>SomeTag</Tag>
      </div>
    </td>
    <td class="text-center">5</td>
    <td class="text-center">12</td>
    <td class="text-center">
      <div class="column author">
        <div class="row-center">
          <div class="profile-image">
            <img
              class="avatar"
              src="https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg"
            />
          </div>
          <div class="name">Elliot Jung</div>
        </div>
        <div class="date">Oct 10, 2021</div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    quizId: { type: Number, default: null },
  },
};
</script>

<style src="./QuizItem.scss" lang="scss" scoped></style>
