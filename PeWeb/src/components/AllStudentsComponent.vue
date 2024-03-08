<template>
  <div>
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
  },
  methods: {
    genderClass(gender) {
      return gender === 'female' ? 'female-student' : 'male-student';
    }
  }
};
</script>

<style>
.students-list li {
  margin: 5px; /* Add some space around each box */
  padding: 10px; /* Add padding inside each box */
  border-radius: 5px; /* Rounded corners */
  display: inline-block; /* Display as inline-block to allow side-by-side */
  width: 200px; /* Set a fixed width for the boxes */
  vertical-align: top; /* Align boxes at the top */
  text-align: center; /* Center text inside the boxes */
}

.female-student {
  background-color: lightpink;
  border: 5px solid hotpink;
}

.male-student {
  background-color: lightblue;
  border: 5px solid darkblue;
}
</style>