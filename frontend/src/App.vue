<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <button @click="toggleDarkMode">Toggle Dark/Light Mode</button>
    <router-view/> 
  </div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme); 
    },
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

  }
};
</script>


<style>
body {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
