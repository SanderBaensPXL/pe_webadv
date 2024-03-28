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
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const student = {
          firstname: this.firstname,
          lastname: this.lastname,
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
        <v-text-field id="first_name_input"
            v-model="firstname"
            :rules="[v => !!v || 'First name is required',
                     v => !/[^a-zA-Z0-9\s]/.test(v) || 'Input must not contain special characters',
                     v => !/\d/.test(v) || 'Last name can not contain numbers']"
            label="First Name"
            required
        ></v-text-field>
        <v-text-field id="last_name_input"
            v-model="lastname"
            :rules="[v => !!v || 'Last name is required',
                     v => !/[^a-zA-Z0-9\s]/.test(v) || 'Input must not contain special characters',
                     v => !/\d/.test(v) || 'Last name can not contain numbers']"
            label="Last Name"
            required
        ></v-text-field>
        <v-btn id="submit" color="#2a73c5" :disabled="!valid" @click="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>