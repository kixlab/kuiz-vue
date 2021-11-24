<template>
  <div class="settings">
    <div class="content-wrapper">
      <div class="profile-image">
        <!--
        <div class="overlay">
          <img src="~assets/icons/edit-white.svg" />
        </div>
        -->
        <img class="avatar" :src="userImage" />
      </div>
      <div class="profile-info">
        <div class="info-item">
          <div class="title">Name</div>
          <input v-model="profile.name" />
        </div>
        <div class="info-item">
          <div class="title">Student ID</div>
          <input v-model="profile.sid" />
        </div>
      </div>
      <Button
        bg="primary"
        style="margin: 48px 0 0 0 !important"
        @click.native="saveProfile"
      >
        Save Changes
      </Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        name: this.$store.state.userName,
        sid: this.$store.state.sid,
      },
    };
  },

  computed: {
    userImage() {
      return this.$store.state.userImage;
    },
  },

  created() {
    this.getLog();
  },

  methods: {
    // saveProfile() {
    //   alert("Changes saved successfully");
    // },
    async saveProfile() {
      try {
        await this.$axios
          .post(`${process.env.baseURL}/auth/set`, {
            sid: this.profile.sid,
            uid: this.$store.state.uid,
          })
          .then(res => {
            console.log("MSG", res.data.msg);
            this.$store.commit("changdSid", res.data.sid);
            this.sid = res.data.sid;
            console.log("Saved", this.$store.state.sid);
          });
      } catch (e) {
        console.log(e);
        throw e;
      }
    },

    getLog() {
      console.log("SID", this.$store.state.sid);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/styles/colors.scss";
@import "~/styles/mixins.scss";

.settings {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 48px 36px;
  @include mbd(xl) {
    padding: 36px 24px;
  }

  .content-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 480px;
    height: 100%;
    margin: 0 auto;

    .profile-image {
      position: relative;
      width: 200px;
      height: 200px;

      &:hover {
        .overlay {
          opacity: 0.5;
          cursor: pointer;
        }
      }

      .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $black-primary;
        border-radius: 50%;
        opacity: 0;

        img {
          height: 28px;
        }
      }

      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .profile-info {
      width: 60%;
      margin-top: 32px;

      .info-item {
        &:not(:first-child) {
          margin-top: 24px;
        }

        .title {
          font-weight: 500;
          font-family: "Poppins", sans-serif;
          color: $grey-primary;
        }

        input {
          width: 100%;
          border: 2px solid $grey-ash;
          border-radius: 12px;
          padding: 8px 16px;
          margin-top: 4px;
          font-size: 1.2rem;
          transition: border 0.3s ease;

          &:focus {
            border: 2px solid $blue-primary;
          }
        }
      }
    }
  }
}
</style>
