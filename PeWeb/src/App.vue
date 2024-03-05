<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/studentlist">Students</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  padding: 1em;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ccc;
}
nav a {
  margin: 0 1em;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid black;
  padding: 0.5em 1em;
  background-color: white;
  color: black;
}

.router-link-active{
  background-color: blue;
  color: white;
  text-decoration: underline;
}
</style>
