<template>
    <div class="home-page">
      <nav>
        <router-link to="/signin">Sign In</router-link> |
        <router-link to="/signout">Sign Out</router-link> |
        <router-link to="/chat">Start Conversation</router-link>
      </nav>
      <h1>Welcome to Our Website</h1>
      <p>Explore our community and start conversations.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        // Data properties for your component
      };
    },
    methods: {
      // Methods for your component
    },
    computed: {
      // Computed properties for your component
    },
    // mounted() {
    //   // Code to run when the component is mounted
    // },
  };
  </script>
  
  <style scoped>
  .home-page {
    text-align: center;
  }
  
  nav a {
    margin: 0 10px;
    text-decoration: none;
    color: #42b983;
  }
  
  nav a:hover {
    color: #333;
  }
  </style>
  