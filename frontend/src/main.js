import { createApp } from 'vue';
import axios from 'axios';
import { jwt_decode } from 'jwt-decode';
import App from './App.vue';
import router from './router'; 
import store from './store';
function isTokenExpired(token) {
  const decoded = jwt_decode(token); 
  const now = Date.now().valueOf() / 1000;
  return decoded.exp < now;
}
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('token');
  if (token && isTokenExpired(token)) {
      try {
          const response = await axios.post('/api/token/refresh');
          token = response.data.token;
          localStorage.setItem('token', token); // Store the new token
          config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
          // Handle failed refresh (e.g., redirect to login)
      }
  } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const app = createApp(App);

app.use(router);

app.use(store);

app.mount('#app');

store.dispatch('validateSession');



