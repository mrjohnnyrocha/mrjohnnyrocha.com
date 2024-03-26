import { createStore } from "vuex";
import axios from "axios";

import {
  signInAPI,
  signUpAPI,
  signOutAPI,
  createConversationAPI,
} from "@/services/api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.defaults.baseURL = "https://127.0.0.1:8000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

const refreshAuthLogic = failedRequest =>
  axios
    .post("/token/refresh", {
      refresh: sessionStorage.getItem("refreshToken"),
    })
    .then(acessTokenRefreshResponse => {
      sessionStorage.getItem("acessToken", acessTokenRefreshResponse.access);
      sessionStorage.getItem("refreshToken", acessTokenRefreshResponse.refresh);

      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + acessTokenRefreshResponse.access;
      return Promise.resolve();
    });
createAuthRefreshInterceptor(axios, refreshAuthLogic);

axios.interceptors.request.use(
  async config => {
    const acessToken = sessionStorage.getItem("acessToken");
    if (acessToken) {
      config.headers = {
        Authorization: "Bearer " + acessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

//   _______________  ____  ______
//  / ___/_  __/ __ \/ __ \/ ____/
//  \__ \ / / / / / / /_/ / __/
// ___/ // / / /_/ / _, _/ /___
// /____//_/  \____/_/ |_/_____/

const store = createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },

  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated;
    },
    user: state => {
      return state.user;
    },
  },

  mutations: {
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUser(state, userData) {
      state.user = userData;
    },
  },

  actions: {
    async validateSession({ commit }) {
      const acessToken = sessionStorage.getItem("acessToken");
      if (!acessToken) {
        commit("setAuthenticated", false);
        commit("setUser", null);
        sessionStorage.removeItem("acessToken");
        sessionStorage.removeItem("user");
      } else {
        axios
          .get("/api/session/validate", {
            headers: {
              Authorization: `Bearer ${acessToken}`,
            },
          })
          .then(response => {
            commit("setAuthenticated", true);
            commit("setUser", response.user);
            sessionStorage.setItem("acessToken", response.acess);
          })
          .catch(error => {
            console.error("Session validation failed:", error);
            commit("setAuthenticated", false);
            commit("setUser", null);
            sessionStorage.removeItem("acessToken");
            sessionStorage.removeItem("user");
          });
      }
    },

    async signIn({ commit }, { email, password }) {
      try {
        const response = await signInAPI(email, password);
        commit("setAuthenticated", true);
        commit("setUser", response.user);
        sessionStorage.setItem("acessToken", response.access);
        sessionStorage.setItem("refreshToken", response.refresh);
        sessionStorage.setItem("user", JSON.stringify(response.user));
      } catch (error) {
        console.error("Error occurred during sign-in:", error);
      }
    },

    async signOut({ commit, $router }) {
      try {
        await signOutAPI();
        commit("setAuthenticated", false);
        commit("setUser", null);
        sessionStorage.removeItem("acessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
        $router.push("/signin");
      } catch (error) {
        console.error("Error occurred during sign-out:", error);
        throw error;
      }
    },

    async signUp({ commit, $router }, { email, password }) {
      try {
        const response = await signUpAPI(email, password);
        commit("setAuthenticated", true);
        commit("setUser", response.data.user);
        sessionStorage.setItem("acessToken", response.acess);
        sessionStorage.setItem("user", response.user);
        $router.push("/");
        return "Sign-up successful!";
      } catch (error) {
        console.log(error);
        console.error("Error occurred during sign-up:", error);

        throw error;
      }
    },

    async createConversation({ commit }, { name }) {
      try {
        const response = await createConversationAPI(name);
        console.log(response, "Hoijoi");
        commit("currentConversation", response.data);
        return;
      } catch (error) {
        console.error("An error ocurred creating the conversation", error);
        throw error;
      }
    },
  },
});

export default store;
