// =================================================
// State
// =================================================

const state = () => {
  const s = {
    modalVisible: false,
    modalIsSelectCourse: true,
    modalIsAddCourse: false,
  };

  return s;
};

// =================================================
// Mutations
// =================================================
const mutations = {
  toggleModal(state, mode) {
    if (state.modalVisible) {
      if (mode === "select") {
        state.modalIsSelectCourse = true;
        state.modalIsAddCourse = false;
      } else if (mode === "add") {
        state.modalIsSelectCourse = false;
        state.modalIsAddCourse = true;
      } else {
        state.modalVisible = !state.modalVisible;
      }
    } else {
      state.modalVisible = !state.modalVisible;
    }
  },

  closeModal(state) {
    state.modalVisible = false;
    state.modalIsSelectCourse = true;
    state.modalIsAddCourse = false;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
