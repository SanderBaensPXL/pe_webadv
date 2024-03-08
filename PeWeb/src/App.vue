<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" v-slot="{ navigate }"><v-btn>Home</v-btn></RouterLink>
        <RouterLink to="/studentlist" v-slot="{ navigate }"><v-btn>Students</v-btn></RouterLink>
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
  margin-left: 15px;
  margin-right: 15px;
}

</style>
