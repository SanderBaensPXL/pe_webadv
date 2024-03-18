<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"><v-btn color="#2a73c5">Home</v-btn></RouterLink>
        <RouterLink to="/studentlist"><v-btn color="#2a73c5">Students</v-btn></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  height: 4em;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
}

nav a {
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 1em;
}

</style>
