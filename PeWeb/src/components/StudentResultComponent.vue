<script>
export default {
  props: [
    'studentId', 'studentName'
  ],
  data() {
    return {
      results: [],
    };
  },
  watch: {
    studentId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchResults();
        }
      }
    }
  },
  methods: {
    async fetchResults() {
      try {
        const response = await fetch(`http://localhost:3000/results?studentId=${this.studentId}`);
        this.results = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  created() {
    this.fetchResults();
  },
};

</script>


<template>
  <h1>{{studentName}}</h1>
  <v-table>
    <thead>
    <tr>
      <th class="text-left"><strong>vak</strong></th>
      <th class="text-left"><strong>cijfer</strong></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="result in results" :key="result.id">
      <td>{{result.vak}}</td>
      <td>{{result.cijfer}}</td>
    </tr>
    </tbody>
  </v-table>
</template>


<style scoped >
  h1{
    text-align: center;
    margin-bottom: 1em;
  }
</style>