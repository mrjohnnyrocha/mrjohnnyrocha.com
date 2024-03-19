<template>
  <div>
    <div v-if="!isAuthenticated">
      <!-- Toggle Between Sign In and Sign Up -->
      <button @click="toggleForm">
        Switch to {{ isSignInForm ? "Sign Up" : "Sign In" }}
      </button>

      <!-- Sign In Form -->
      <form v-if="isSignInForm" @submit.prevent="handleSignIn">
        <input type="email" v-model="signInEmail" placeholder="Email" default="joaorocha619@gmail.com" required />
        <input type="password" v-model="signInPassword" placeholder="Password" required />
        <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
        <button type="submit">Sign In</button>
      </form>

      <!-- Sign Up Form -->
      <form v-else @submit.prevent="handleSignUp">
        <input type="email" v-model="signUpEmail" placeholder="Email" required />
        <input type="password" v-model="signUpPassword" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>

    <!-- Conversation Starter UI -->
    <div v-else>
      <p>You are now signed in. Start a new conversation!</p>
      <form @submit.prevent="startNewConversation">
        <input v-model="newConversationName" placeholder="Enter conversation name" required />
        <button type="submit" :disabled="isSubmitting">
          Start Conversation
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
  <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ChatPage",
  namespaced: true,
  data() {
    return {
      signInEmail: "joaorocha619@gmail.com",
      signInPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      newConversationName: "New Conversation",
      isSubmitting: false,
      error: "",
      errorMessage: "",
      signInError: "",
      isSignInForm: true,
      messages: [],
    };
  },
  methods: {
    ...mapActions(["signIn", "signUp", "createConversation"]),

    async handleSignIn() {
      try {
        await this.signIn({
          email: this.signInEmail,
          password: this.signInPassword,
        });
        this.signInEmail = "";
        this.signInPassword = "";
      } catch (error) {
        console.error("Could not sign in.", error);
      }
    },

    async handleSignUp() {
      try {
        await this.signUp({
          email: this.signUpEmail,
          password: this.signUpPassword,
        });
        this.signUpEmail = "";
        this.signUpPassword = "";
        this.$router.push("/home");
      } catch (error) {
        console.error("Could not sign up.", error);
      }
    },

    async startNewConversation() {
      this.error = "";
      this.isSubmitting = true;

      // Check if user is authenticated
      if (!this.isAuthenticated) {
        this.error = "You need to sign in or sign up first.";
        return;
      }
      // Create new conversation
      try {
        this.isSubmitting = false;
        const response = await this.createConversation({
          name: this.newConversationName,
        });
        console.log(response);
        this.newConversationName = "";
        this.$router.push({
          name: "ChatDisplay",
          params: { conversationId: response.data.uuid },
        });
      } catch (error) {
        this.error = "Failed to start new conversation";
        console.error("Could not create conversation.", error);
      }
    },

    toggleForm() {
      this.isSignInForm = !this.isSignInForm;
    },
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
};
</script>

<style scoped>
.start-conversation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.start-conversation h2 {
  margin-bottom: 1rem;
}

.start-conversation form {
  width: 100%;
  max-width: 300px;
}

.start-conversation input,
.start-conversation button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
}

/* Container styles */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

/* Button styles */
button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Form styles */
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

input {
  margin: 5px 0;
  padding: 10px;
  border: 1 px solid #ccc;
  border-radius: 5px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}
</style>
