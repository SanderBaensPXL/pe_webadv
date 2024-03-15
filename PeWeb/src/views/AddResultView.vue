<template>
  <div class="about">
    <add-result-component :student-id="studentId"/>
  </div>
</template>

<script>
import AddResultComponent from "@/components/AddResultComponent.vue";

export default {
  name: 'addResults',
  props: {
    studentId: {
      type: Number,
      required: true
    }
  },
  components: {
    AddResultComponent
  },
}
</script>

<style>
</style>