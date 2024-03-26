import axios from "axios";
import { h } from "vue";
axios.defaults.baseURL = "https://127.0.0.1:8000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const fetchUserDetails = async () => {
  return axios.get("/user/details/");
};

export const createConversationAPI = async name => {
  const accessToken = sessionStorage.getItem("accessToken"); // Retrieve the stored accessToken
  const headers = {
    Authorization: `Bearer ${accessToken}`, // Use the retrieved accessToken
    "Content-Type": "application/json",
  };
  const payload = { name }; // This is the conversation name you want to create

  try {
    console.log(headers, payload); // Debugging
    const response = await axios.post("/conversation/", payload, {
      headers,
    });
    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    console.error("Error config:", error.config);
    throw error;
  }
};

console.log("Debug: API module loaded successfully");

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
  sessionStorage.removeItem("accessToken");
};

export const signUpAPI = async userData => {
  const response = await axios.post("/auth/signup/", userData);
  const { accessToken } = response.data;
  sessionStorage.setItem("accessToken", accessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return accessToken;
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
