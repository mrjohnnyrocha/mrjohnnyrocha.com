import axios from "axios";
axios.defaults.baseURL = "https://127.0.0.1:8000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const fetchUserDetails = async () => {
  return axios.get("/user/details/");
};

export const createConversationAPI = async payload => {
  return axios.post(
    "/conversation/",
    { payload: payload },
    { withCredentials: true }
  );
};

export const sendMessage = async messageData => {
  return axios.post("/message/", messageData);
};

export const fetchMessages = async conversationUUID => {
  return axios.get(`/messages/?conversation=${conversationUUID}`);
};

export const signInAPI = async (email, password) => {
  try {
    const response = await axios.post("/auth/signin/", { email, password });
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Login error:", error.response.data);
    } else if (error.request) {
      console.error("Login error: No response received", error.request);
    } else {
      console.error("Login error: Request setup failed", error.message);
    }
    throw new Error("An error occurred during sign-in.");
  }
};

export const signOutAPI = async () => {
  await axios.post("/auth/signout/");
  localStorage.removeItem("token");
};

export const signUpAPI = async userData => {
  const response = await axios.post("/auth/signup/", userData);
  const { token } = response.data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return token;
};

export default {
  createConversationAPI,
  fetchMessages,
  fetchUserDetails,
  sendMessage,
  signInAPI,
  signUpAPI,
  signOutAPI,
};
