<template>
  <div class="participants">
    <div class="content-wrapper">
      <div class="title">Participants</div>
      <ParticipantList />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      participants: [],
      targets: [],
    };
  },
  created() {
    this.getParticipants();
  },
  methods: {
    async getParticipants() {
      try {
        await this.$axios
          .get("http://localhost:8080/class/participants/status", {
            params: {
              code: this.$route.params.courseCode,
            },
          })
          .then(res => {
            this.participants = res.data.info;
          });
      } catch (e) {
        console.log(e);
      }
    },
  },

  async getObjectivesTarget() {
    try {
      await this.$axios
        .get("http://localhost:8080/class/target", {
          params: {
            code: this.$route.params.courseCode,
          },
        })
        .then(res => {
          this.target = res.data.target;
        });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

};
</script>

<style lang="scss" scoped>
@import "~/styles/mixins.scss";

.participants {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 48px 36px;
  @include mbd(xl) {
    padding: 36px 24px;
  }
  overflow: auto;

  .content-wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    .title {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
      letter-spacing: -0.02em;
    }
  }
}
</style>
