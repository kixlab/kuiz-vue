<template>
  <Wrapper rounded shadow px="0" class="participant-list">
    <div class="scroll-area">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Quizzes created</th>
            <th scope="col">Quizzes solved</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Wrapper>
</template>

<script>
export default {};
</script>

<style src="./ParticipantList.scss" lang="scss" scoped></style>
