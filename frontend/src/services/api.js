import axios from 'axios';

// Correctly set the base URL for all axios requests
axios.defaults.baseURL = 'https://127.0.0.1:8001/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchUserDetails = async () => {
  return axios.get('/user/details/');
};

export const createConversation = async (payload) => {
  return axios.post('/conversation/', payload);
};

export const sendMessage = async (messageData) => {
  return axios.post('/message/', messageData);
};

export const fetchMessages = async (conversationUUID) => {
  return axios.get(`/messages/?conversation=${conversationUUID}`);
};

export const signInAPI = async (email, password) => {
    try {
        const response = await axios.post('/auth/signin/', {email, password});
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token
        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.response?.data?.detail || "An error occurred during sign-in.");
    }
};

export const signOutAPI = async () => {
    await axios.post('/auth/signout/');
    localStorage.removeItem('token'); // Remove the token
};

export const signUpAPI = async (userData) => {
    const response = await axios.post('/auth/signup/', userData);
    const { token } = response.data;
    localStorage.setItem('token', token); // Assuming immediate login
    return token;
};

export default {
    createConversation,
    fetchMessages,
    fetchUserDetails,
    sendMessage,
    signInAPI,
    signUpAPI,
    signOutAPI,
};
