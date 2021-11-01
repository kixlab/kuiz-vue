// =================================================
// State
// =================================================

const state = () => {
  const s = {
    modalImageURL: "",
    modalVisible: false,
    modalIsSelectCourse: true,
    modalIsAddCourse: false,
    modalIsImage: false,
    quizModalVisible: false,
    isLoggedIn: false,
  };

  return s;
};

// =================================================
// Mutations
// =================================================
const mutations = {
  toggleModal(state, payload) {
    if (state.modalVisible) {
      if (payload.mode === "select-course") {
        state.modalIsSelectCourse = true;
        state.modalIsAddCourse = false;
        state.modalIsImage = false;
      } else if (payload.mode === "add-course") {
        state.modalIsSelectCourse = false;
        state.modalIsAddCourse = true;
        state.modalIsImage = false;
      } else if (payload.mode === "image") {
        state.modalIsSelectCourse = false;
        state.modalIsAddCourse = false;
        state.modalIsImage = true;
        state.modalImageURL = payload.imageURL;
      } else {
        state.modalVisible = false;
        state.modalIsSelectCourse = false;
        state.modalIsAddCourse = false;
        state.modalIsImage = false;
      }
    } else {
      if (payload.mode === "select-course") {
        state.modalIsSelectCourse = true;
        state.modalIsAddCourse = false;
        state.modalIsImage = false;
      } else if (payload.mode === "add-course") {
        state.modalIsSelectCourse = false;
        state.modalIsAddCourse = true;
        state.modalIsImage = false;
      } else if (payload.mode === "image") {
        state.modalIsSelectCourse = false;
        state.modalIsAddCourse = false;
        state.modalIsImage = true;
        state.modalImageURL = payload.imageURL;
        console.log(payload.imageURL);
      }
      state.modalVisible = !state.modalVisible;
    }
  },

  toggleQuizModal(state) {
    state.quizModalVisible = !state.quizModalVisible;
  },

  closeModal(state) {
    state.modalVisible = false;
    state.modalIsSelectCourse = false;
    state.modalIsAddCourse = false;
    state.modalIsImage = false;
  },

  closeQuizModal(state) {
    state.quizModalVisible = false;
  },

  logIn(state) {
    state.isLoggedIn = true;
  },

  logOut(state) {
    state.isLoggedIn = false;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
