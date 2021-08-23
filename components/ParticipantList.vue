<template>
  <Wrapper rounded shadow class="participant-list">
    <div class="title">123 students participating in total</div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th class="text-center">Quizzes created</th>
          <th class="text-center">Quizzes solved</th>
          <th class="text-center">Comments</th>
        </tr>
      </thead>
      <tbody>
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
        <ParticipantItem />
      </tbody>
    </table>
  </Wrapper>
</template>

<script>
export default {};
</script>

<style src="./ParticipantList.scss" lang="scss" scoped></style>
