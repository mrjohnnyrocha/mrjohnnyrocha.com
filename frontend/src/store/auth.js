
import { signInAPI, signUpAPI, signOutAPI } from '@/services/api'; // Import API functions

const state = {
    isAuthenticated: false,
    user: null,
};

const getters = {
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
};

const mutations = {
    setAuthenticated(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
    },
    setUser(state, userData) {
        state.user = userData;
    },
};

const actions = {
    async signIn({ commit }, { email, password, $router }) {
        try {
            const response = await signInAPI(email, password);
            commit('setAuthenticated', true);

            console.log("response", response);
            // Optionally redirect the user to the home page after sign-in
            $router.push('/');
            return 'Sign-in successful!';

        } catch (error) {
            console.error('Error occurred during sign-in:', error);
            throw error; // Rethrow the error to be handled in the component
        }
    },

    async signOut({ commit, $router }) {
        try {
            await signOutAPI(); // Assuming you have an API call for sign-out
            commit('setAuthenticated', false);
            commit('setUser', null);

            // Optionally redirect to sign-in or home page
            $router.push('/signin');
        } catch (error) {
            console.error('Error occurred during sign-out:', error);
            throw error; // Rethrow the error to be handled in the component
        }
    },

    async signUp({ commit }, { email, password, $router }) {
        try {
            const response = await signUpAPI({ email, password });
            commit('setAuthenticated', true);
            commit('setUser', response.user); // Assuming the API returns user data on sign-up

            // Optionally redirect the user to the home page after sign-up
            $router.push('/');

        } catch (error) {
            console.error('Error occurred during sign-up:', error);
            // Optionally notify the user
            throw error; // Rethrow the error to be handled in the component
        }
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
