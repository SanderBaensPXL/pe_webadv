<template>
  <div id="studentList">
    <v-card
        max-width="300"
        v-if="loaded"
    >
      <v-list :items="studentsWithFullName" item-title="fullname" item-value="id"></v-list>
    </v-card>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { useStudentsStore } from "@/stores/students";

export default {
  name: 'StudentList',
  data() {
    return {
      store: useStudentsStore(),
      loaded: false
    };
  },
  computed: {
    studentsWithFullName() {
      return this.store.students.map(student => ({
        ...student,
        fullname: `${student.firstname} ${student.lastname}`
      }));
    }
  },
  mounted() {
    this.store.fetchStudents().then(() => {
      this.loaded = true;
    });
  }
};
</script>

<style>
 #studentList {
   margin-top: 3vh;
 }
</style>