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
    userEmail: "",
    userName: "",
    userImage: "",
    uid: "",
    classes: [],
    currentCourse: "",
    sid: "",
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

  changeCourse(state, classCode) {
    state.currentCourse = classCode;
  },

  logIn(state, userInfo) {
    state.isLoggedIn = true;
    state.userEmail = userInfo.userEmail;
    state.userName = userInfo.userName;
    state.userImage = userInfo.userImage;
    state.classes = userInfo.classes;
    state.uid = userInfo.uid;
    state.sid = userInfo.sid;
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
