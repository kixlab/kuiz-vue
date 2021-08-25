<template>
  <div class="settings">
    <div class="content-wrapper">
      <div class="profile-image">
        <div class="overlay">
          <img src="~assets/icons/edit-white.svg" />
        </div>
        <img
          class="avatar"
          src="https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg"
        />
      </div>
      <div class="profile-info">
        <div class="info-item">
          <div class="title">Name</div>
          <input v-model="info.name" />
        </div>
        <div class="info-item">
          <div class="title">Student ID</div>
          <input v-model="info.id" />
        </div>
      </div>
      <Button
        slim
        bg="primary"
        style="margin-top: 48px"
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
      info: {
        name: "Elliot Jung",
        id: "20150681",
      },
    };
  },

  methods: {
    saveProfile() {
      alert("Changes saved successfully");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/styles/colors.scss";

.settings {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  padding: 64px 48px;

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
          height: 32px;
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
      width: 80%;
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
          font-size: 19px;

          &:focus {
            border: 2px solid $blue-primary;
          }
        }
      }
    }
  }
}
</style>
