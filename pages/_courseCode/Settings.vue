<template>
  <div class="settings">
    <div class="content-wrapper">
      <div class="profile-image">
        <!--
        <div class="overlay">
          <img src="~assets/icons/edit-white.svg" />
        </div>
        -->
        <img class="avatar" :src="profile.avatar" />
      </div>
      <div class="profile-info">
        <div class="info-item">
          <div class="title">Name</div>
          <input v-model="profile.name" type="text" maxlength="25" />
        </div>
        <div class="info-item">
          <div class="title">Student ID</div>
          <input v-model="profile.sid" type="text" maxlength="8" />
        </div>
      </div>
      <Button
        bg="primary"
        class="save row-center"
        :class="{ saved: saved }"
        @click.native="
          () => {
            if (!loading && !saved) {
              loading = true;
              saved = false;
              saveProfile();
            }
          }
        "
      >
        <div v-show="loading && !saved" class="loader">
          <beat-loader size="12px" color="#ffffff" margin="3px"></beat-loader>
        </div>
        <div v-show="!loading && !saved">Save Changes</div>
        <div v-show="saved">Saved!</div>
      </Button>
    </div>
  </div>
</template>

<script>
import BeatLoader from "vue-spinner/src/BeatLoader.vue";

export default {
  components: { BeatLoader },

  data() {
    return {
      loading: false,
      saved: false,
      profile: {
        avatar: this.$store.state.userImage,
        name: this.$store.state.userName,
        sid: this.$store.state.sid,
        uid: this.$store.state.uid,
      },
    };
  },

  methods: {
    saveProfile() {
      if (this.profile.name.match(/^\s*$/) !== null) {
        alert("Please enter your name");
      }
      if (!(this.profile.sid.match(/^\d+$/) !== null)) {
        alert("Please enter a valid student ID");
      }

      try {
        this.$axios
          .post(`${process.env.baseURL}/auth/set`, {
            uid: this.profile.uid,
            name: this.profile.name,
            sid: this.profile.sid,
          })
          .then(res => {
            this.$store.commit("changeUsername", res.data.name);
            this.$store.commit("changeSid", res.data.sid);
            this.profile.name = res.data.name;
            this.profile.sid = res.data.sid;
            setTimeout(
              () => {
                setTimeout(() => {
                  this.loading = false;
                  this.saved = false;
                }, 1000);
              },
              400,
              setTimeout(() => {
                this.loading = false;
                this.saved = true;
              }, 400),
            );
          });
      } catch (e) {
        console.log(e);
        throw e;
      }
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
        border: 6px solid $grey-silver;
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
          padding: 8px 12px;
          margin-top: 4px;
          font-size: 1.2rem;
          transition: border 0.3s ease;

          &:focus {
            border: 2px solid $blue-primary;
          }

          &:disabled {
            background-color: $grey-silver;
          }
        }
      }
    }

    .save {
      width: 152px;
      margin: 48px 0 0 0 !important;
      transition: background-color 0.7s ease;

      &.saved {
        background-color: $green-primary;
        color: $white-flat;
        transition: background-color 0.3s ease;
      }

      .loader {
        .v-spinner {
          display: flex;
          padding: 4.5px 0;
        }
      }
    }
  }
}
</style>
