<template>
    <div class="sign-in-page">
        <h1>Sign In</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Sign In</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            // Handle form submission here
        },
    },
};
</script>

<style scoped>
.sign-in-page {
    /* Add your styles here */
}
</style>