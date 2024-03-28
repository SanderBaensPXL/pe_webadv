<script>
import {useResultsStore} from "@/stores/results.js";

export default {
  name: 'AddResultComponent',
  data() {
    return {
      valid: true,
      store: useResultsStore(),
      vak: '',
      cijfer: null,
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const result = {
          studentId: this.studentId,
          vak: this.vak,
          cijfer: parseInt(this.cijfer),
        };
        this.store.addResult(result);
        this.$router.push({name: 'studentlist'});
      }
    },
  },
  props:{
    studentId:{
      type: Number,
      required: true
    }
  }
};
</script>

<template>
  <v-card>
    <v-card-title>Add Student</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field id="course_input"
            v-model="vak"
            :rules="[v => !!v || 'Course is required',
                     ]"
            label="Course"
            required
        ></v-text-field>
        <v-text-field id="result_input"
            v-model="cijfer"
            :rules="[
                v => !!v || 'Result is required',
                v => !isNaN(parseFloat(v)) && isFinite(v) || 'Result must be a number',
                v => (parseFloat(v) >= 0 && parseFloat(v) <= 100) || 'Result must be between 0 and 100'
             ]"
            label="Result"
            required
        ></v-text-field>
        <v-btn id="submit" color="#2a73c5" :disabled="!valid" @click="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>