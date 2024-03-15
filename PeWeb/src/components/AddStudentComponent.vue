<script>
import { useStudentsStore } from "@/stores/students";

export default {
  name: 'AddStudentComponent',
  data() {
    return {
      valid: true,
      store: useStudentsStore(),
      firstname: '',
      lastname: '',
      gender: null,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const student = {
          firstname: this.firstname,
          lastname: this.lastname,
          gender: this.gender,
        };
        // Correctly get the store instance and call the action
        this.store.addStudent(student);
        this.$router.push({ name: 'studentlist' }); // Adjust the route as necessary
      }
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title>Add Student</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
            v-model="firstname"
            :rules="[v => !!v || 'First name is required']"
            label="First Name"
            required
        ></v-text-field>
        <v-text-field
            v-model="lastname"
            :rules="[v => !!v || 'Last name is required']"
            label="Last Name"
            required
        ></v-text-field>
        <v-select
            v-model="gender"
            :items="['male', 'female']"
            :rules="[v => !!v || 'Gender is required']"
            label="Gender"
            required
        ></v-select>
        <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>