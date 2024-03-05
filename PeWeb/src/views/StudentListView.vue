<template>
  <div class="about">
    <h1>Here we will show a list of persons using a component:</h1>
    <AllStudentsComponent />
  </div>
</template>

<script>
import AllStudentsComponent from "@/components/AllStudentsComponent.vue";

export default {
  name: 'StudentListView',
  components: {
    AllStudentsComponent
  }
}
</script>

<style>
</style>