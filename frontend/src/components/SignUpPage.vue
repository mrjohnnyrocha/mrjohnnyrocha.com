<template>
    <h2>Sign Up</h2>
    <form @submit.prevent="submitForm">
        <input type="text" v-model="username" placeholder="Username" required @submit.prevent="submitForm">
        <input type="email" v-model="email" placeholder="Email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Sign Up</button>
    </form>
</template>

<script>
import { signUpAPI } from '@/services/api';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const userData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                };
                const token = await signUpAPI(userData);
                console.log('Sign-up successful, token:', token);
                // Perform any additional actions like redirecting to the home page
                this.$router.push('/home');
            } catch (error) {
                console.error('Sign-up error:', error);
                // Handle sign-up error (e.g., display error message to user)
            }
        },
    },
};
</script>

<style scoped>
.sign-up-page {
    /* Add your styles here */
}
</style>
