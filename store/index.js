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
    isLoggedIn: false,
    userEmail: "",
    userName: "",
    _id:"",
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

  closeModal(state) {
    state.modalVisible = false;
    state.modalIsSelectCourse = false;
    state.modalIsAddCourse = false;
    state.modalIsImage = false;
  },

  logIn(state, userInfo) {
    state.isLoggedIn = true;
    // console.log("This is",userInfo)
    state.userEmail = userInfo.userEmail;
    state.userName = userInfo.userName;
    state._id = userInfo._id;
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
