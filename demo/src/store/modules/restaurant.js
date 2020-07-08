const state = () => ({
  data: []
});

const mutations = {
  GET_DATA(state, payload) {
    console.log(payload);
    console.log(state.data);
    state.data.push(payload);
    console.log(state.data);
  }
};
const actions = {
  GET_DATA({ commit }, payload) {
    commit("GET_DATA", payload);
  }
};

export default {
  state,
  mutations,
  actions
};
