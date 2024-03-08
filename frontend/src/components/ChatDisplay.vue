<template>
  <div class="chat-container">

    <div v-for="(message, index) in messages" :key="index" class="message-bubble" :class="{'own-message': message.isOwnMessage}">
      {{ message.text }} 
    </div>

    <input v-model="question" @keyup.enter="send" placeholder="Type a message..." />
    <button @click="send">Send</button>

  </div>


  <div v-if="!conversationId">
    <p>No conversation selected</p>
  </div>

  <div v-else>
    <p>Selected conversation: {{ conversationId }}</p>
  </div>



</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      question: '',
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    conversationId() {
      return this.$store.state.conversationId;
    }
  },
  methods: {
    ...mapActions(['fetchMessages', 'sendMessage']),

    async send() {
      if (!this.conversationId) {
        console.error('No conversation selected');
        return;
      }
      await this.sendMessage(this.question);
      this.question = ''; // Reset the input field after sending the message.
    },
  },
  async mounted() {
    if (this.conversationId) {
      await this.fetchMessages(this.conversationId);
    }
  },
};
</script>


<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.message-bubble {
  margin: 5px;
  padding: 10px;
  border-radius: 20px;
  background-color: #f0f0f0;
  max-width: 60%;
}

.own-message {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
}
</style>

