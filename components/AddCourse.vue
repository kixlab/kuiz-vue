<template>
  <div class="inner-wrapper">
    <Wrapper class="modal-title">Enter Course Code</Wrapper>
    <Wrapper px="6" py="0" class="description">
      You need a 4-digit code to join a course workspace. Check your course
      website on KLMS for related announcements or ask the instructor for access
      code.
    </Wrapper>
    <Wrapper class="row-center" style="margin: 28px 0">
      <div class="code-input">
        <input
          v-model="code.firstDigit"
          name="First Digit"
          autocomplete="off"
          type="text"
          maxlength="1"
          inputmode="numeric"
          value=""
          @keyup="onKeyUp"
          @keydown="onKeyDown"
        />
        <input
          v-model="code.secondDigit"
          name="Second Digit"
          autocomplete="off"
          type="text"
          maxlength="1"
          inputmode="numeric"
          value=""
          @keyup="onKeyUp"
          @keydown="onKeyDown"
        />
        <input
          v-model="code.thirdDigit"
          name="Third Digit"
          autocomplete="off"
          type="text"
          maxlength="1"
          inputmode="numeric"
          value=""
          @keyup="onKeyUp"
          @keydown="onKeyDown"
        />
        <input
          v-model="code.fourthDigit"
          name="Fourth Digit"
          autocomplete="off"
          type="text"
          maxlength="1"
          inputmode="numeric"
          value=""
          @keyup="onKeyUp"
          @keydown="onKeyDown"
        />
      </div>
    </Wrapper>
    <Wrapper class="row-center">
      <Button class="w-100" @click.native="closeModal">Cancel</Button>
      <Button class="w-100" bg="primary" @click.native="enterCourse">
        Continue
      </Button>
    </Wrapper>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      code: {
        firstDigit: null,
        secondDigit: null,
        thirdDigit: null,
        fourthDigit: null,
      },
      success: false,
    };
  },

  methods: {
    onKeyUp(event) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");

      if (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105)
      ) {
        const next = event.target.nextElementSibling;
        if (next === null) {
          return;
        }
        next.focus();
      }
    },

    onKeyDown(event) {
      if (event.keyCode === 8 && event.target.value === "") {
        const prev = event.target.previousElementSibling;
        if (prev === null) {
          return;
        }
        prev.focus();
      }
    },

    async enterCourse() {
      if (
        this.code.firstDigit === null ||
        this.code.firstDigit.match(/^\s*$/) !== null ||
        this.code.secondDigit === null ||
        this.code.secondDigit.match(/^\s*$/) !== null ||
        this.code.thirdDigit === null ||
        this.code.thirdDigit.match(/^\s*$/) !== null ||
        this.code.fourthDigit === null ||
        this.code.fourthDigit.match(/^\s*$/) !== null
      ) {
        alert("Please enter a valid course code.");
      } else {
        const code =
          this.code.firstDigit.toString() +
          this.code.secondDigit.toString() +
          this.code.thirdDigit.toString() +
          this.code.fourthDigit.toString();

        try {
          const info = {
            userEmail: this.$store.state.userEmail,
            joinCode: code,
            _id: this.$store.state.uid,
          };

          await this.$axios.post(`${process.env.baseURL}/class/join`, info).then(
            res => {
              this.success = res.data().success;
            },
          );

          this.$store.commit("changeCourse", code);
        } catch (e) {
          console.error(e);
        }
        if (this.success) {
          this.closeModal();
          this.$router.push("/" + code);
        } else {
          console.log("Oops, try again");
          this.code.firstDigit = null;
          this.code.secondDigit = null;
          this.code.thirdDigit = null;
          this.code.fourthDigit = null;
          alert("The course code you entered does not exist. Please ask the instructor for a valid code.");
        }
      }
    },

    ...mapMutations(["closeModal"]),
  },
};
</script>

<style src="./AddCourse.scss" lang="scss" scoped />
