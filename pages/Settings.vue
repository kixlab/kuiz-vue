<template>
  <div class="settings">
    <div class="content-wrapper">
      <div class="profile-image">
        <div class="overlay">
          <img src="~assets/icons/edit-white.svg" />
        </div>
        <img class="avatar" src="~assets/images/profile-default.png" />
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
};
</script>

<style lang="scss" scoped>
@import "~/styles/colors.scss";

.settings {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  .content-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
    padding: 64px 48px;

    .profile-image {
      position: relative;

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
        width: 200px;
        border-radius: 50%;
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
          font-family: "Poppins";
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
