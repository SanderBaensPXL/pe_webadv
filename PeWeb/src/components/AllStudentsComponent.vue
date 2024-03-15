<template>
  <div id="wrapper">
    <div id="studentList">
      <v-card
          min-width="150px"
          v-if="loaded"
          elevation="5"
      >
        <v-list v-if="loaded" elevation="5">
          <v-list-item v-for="student in studentsWithFullName" :key="student.id"
                       @click="selectStudent(student.id, student.fullname)">
            <v-list-item-content>
              <v-list-item-title>{{ student.fullname }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item id="addStudent" @click="$router.push({ name: 'AddStudent' })">
            <v-list-item-content>
              <v-list-item-title>Add Student</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <p v-else>Loading...</p>
    </div>
    <div id="resultsList">
      <v-card :elevation="15" :height="800" :width="1000" rounded>
        <StudentResultComponent :studentId="selectedStudentId"
                                :student-name="selectedStudentName"></StudentResultComponent>
      </v-card>
    </div>
  </div>
</template>

<script>
import {useStudentsStore} from "@/stores/students";
import StudentResultComponent from "@/components/StudentResultComponent.vue";

export default {
  name: 'StudentList',
  components: {StudentResultComponent},
  data() {
    return {
      store: useStudentsStore(),
      loaded: false,
      selectedStudentId: null,
      selectedStudentName: null
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
      if (this.studentsWithFullName.length > 0) {
        this.selectStudent(this.studentsWithFullName[0].id, this.studentsWithFullName[0].fullname);
      }
    });
  },
  methods: {
    selectStudent(id, name) {
      this.selectedStudentId = id;
      this.selectedStudentName = name;
    }
  }
};
</script>

<style>
#addStudent {
  background-color: #2a73c5;
  color: white;
  border-radius: 5px;
  width: 110px;
  text-align: center;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

#wrapper {
  margin-top: 2em;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: space-around;
  justify-items: center;
  align-content: center;
  align-items: center;
}

#studentList {
  justify-self: end;
  align-self: start;
}
</style>