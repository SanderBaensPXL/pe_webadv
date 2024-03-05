import { defineStore } from 'pinia';

export const useStudentsStore = defineStore('students', {
    state: () => ({
        students: [],
        error: ''
    }),

    getters: {
        numberOfStudents: (state) => state.students.length
    },

    actions: {
        async fetchStudents() {
            try {
                const response = await fetch('http://localhost:3000/students');
                if (!response.ok) {
                    let status = response.status
                    throw new Error(`error status code ${status}`);
                }
                this.students = await response.json();
            } catch (error) {
                this.error = error.message;
            }
        }
    }
});

