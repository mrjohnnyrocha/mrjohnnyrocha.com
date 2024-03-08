The warning export 'default' (imported as 'Vue') was not found in 'vue' is caused by the following line in your code:

js


Copy code
import Vue from 'vue';
This line is trying to import the default export from the vue package, but as the warning suggests, there is no default export in the vue package. Instead, vue exports several named exports.

To fix this warning, you should remove this line:

js


Copy code
import Vue from 'vue';
And replace the next line:

js


Copy code
Vue.use(Vuex);
with:

js


Copy code
import { createApp } from 'vue';
const app = createApp({});
app.use(Vuex);

import { createApp } from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { signInAPI, signOutAPI, signUpAPI } from '../services/api';

const app = createApp({});
app.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage,
  reducer: state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  }),
});
export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null,
    userUUID: null,
    conversationId: null,
    messages: [],
    error: null,
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserUUID(state, uuid) {
      state.userUUID = uuid;
    },
    setConversationId(state, uuid) {
      state.conversationId = uuid;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    addMessage(state, message) {
      state.messages.push(message);
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async signIn({ commit }, credentials) {
      commit('clearError');
      try {
        const token = await signInAPI(credentials);
        localStorage.setItem('token', token); // Store the token
        commit('setAuthenticated', true);
        // Optionally fetch user details here and update state
      } catch (error) {
        commit('setError', error.message || "An error occurred during sign-in.");
      }
    },
    async signOut({ commit }) {
      try {
        await signOutAPI(); // Inform the backend about the sign out
        localStorage.removeItem('token'); // Remove the token
        commit('setAuthenticated', false);
        commit('setUser', null);
        commit('clearError');
      } catch (error) {
        commit('setError', error.message || "An error occurred during sign-out.");
      }
    },
    async signUp({ commit }, userData) {
      commit('clearError');
      try {
        const token = await signUpAPI(userData);
        localStorage.setItem('token', token); // Assuming immediate login
        commit('setAuthenticated', true);
        // Optionally fetch user details here and update state
      } catch (error) {
        commit('setError', error.message || "An error occurred during sign-up.");
      }
    },
    // Remaining actions...
  },
  plugins: [vuexPersist.plugin],
});
