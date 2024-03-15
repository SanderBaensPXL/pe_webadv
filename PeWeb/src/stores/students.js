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
        },

        async addStudent(student) {
            try {
                const response = await fetch('http://localhost:3000/students', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(student),
                });
                if (!response.ok) {
                    let status = response.status;
                    throw new Error(`error status code ${status}`);
                }
                const newStudent = await response.json();
                this.students.push(newStudent);
            } catch (error) {
                this.error = error.message;
            }
        }
    },
});

