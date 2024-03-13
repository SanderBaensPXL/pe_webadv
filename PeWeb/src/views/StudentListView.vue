<template>
  <div class="about">
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