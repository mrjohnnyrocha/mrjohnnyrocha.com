<template>
    <div class="about">
      <header>
        <h1>About Us</h1>
      </header>
      <section>
        <h2>Our Mission</h2>
        <p>To deliver outstanding content and experiences to our visitors every day.</p>
      </section>
      <section>
        <h2>Our Story</h2>
        <p>A brief history of our website and the team behind it.</p>
      </section>
      <section class="team-photo">
        <img src="@/assets/logo.png" alt="Our Team">
        <p>Meet the team that makes it all happen.</p>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutMePage",
  };
  </script>
  
  <style scoped>
  .about header,
  .about section {
    text-align: center;
  }
  .about .team-photo img {
    width: 100%;
    max-width: 600px;
    /* Adjust image styling as necessary */
  }
  </style>
  