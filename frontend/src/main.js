import { createApp } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Axios interceptor for handling acessToken expiration
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.interceptors.request.use(async config => {
  let acessToken = sessionStorage.getItem("accessToken");
  if (acessToken) {
    const decoded = jwtDecode(acessToken);
    const now = Date.now().valueOf() / 1000;
    if (decoded.exp < now) {
      try {
        const response = await axios.post("/api/token/refresh");
        acessToken = response.data.acessToken;
        sessionStorage.setItem("acessToken", acessToken);
        config.headers.Authorization = `Bearer ${acessToken}`;
      } catch (error) {
        console.error("Token refresh failed:", error);
        // Add additional error handling here, e.g., redirect to login
      }
    } else {
      config.headers.Authorization = `Bearer ${acessToken}`;
    }
  }
  return config;
});

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
