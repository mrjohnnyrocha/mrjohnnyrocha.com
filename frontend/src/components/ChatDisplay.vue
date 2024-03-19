<template>
  <div class="chat-container">

    <div v-for="(message, index) in messages" :key="index" class="message-bubble"
      :class="{ 'own-message': message.isOwnMessage }">
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
  name: 'ChatDisplay',
  data() {
    return {
      question: '',
    };
  },
  props: ['conversationId'],
  watch: {
    conversationId(newVal) {
      this.fetchMessages(newVal);
    }
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
    async fetchMessages(conversationId) {
      try {
        const response = await axios.get(`/api/conversations/${conversationId}`);
        this.messages = response.data;
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        // Handle the error appropriately
      }
    },
    async setupWebSocket() {
      const ws = new WebSocket('ws://localhost:3000/ws/conversations/{conversationId}');
      ws.onopen = () => {
        console.log('WebSocket is open now.');
      };

      ws.onerror = (error) => {
        console.error('WebSocket encountered error: ', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket is closed now.', event);
      };

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        if (newMessage.conversationId === this.conversationId) {
          this.messages.push(newMessage);
        }
      }


    },
    async send() {
      if (!this.conversationId) {
        console.error('No conversation selected');
        return;
      }
      await this.sendMessage(this.question);
      this.question = '';
    }
  },
  mounted() {
    this.setupWebSocket();
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
