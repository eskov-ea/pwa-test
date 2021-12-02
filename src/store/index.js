import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";


export default createStore({
  state: {
    lastUserId: undefined
  },
  mutations: {
    SAVE_LAST_USER_ID(state, id){
      state.lastUserId = id;
    }
  },
  actions: {
  },
  getters:{
    GET_LAST_USER_ID(state){
      return state.lastUserId;
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
