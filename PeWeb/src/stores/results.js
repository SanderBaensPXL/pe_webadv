import { defineStore } from 'pinia';

export const useResultsStore = defineStore('results', {
    state: () => ({
        results: [],
        error: ''
    }),

    actions: {
        async fetchResults() {
            try {
                const response = await fetch('http://localhost:3000/results');
                if (!response.ok) {
                    let status = response.status
                    throw new Error(`error status code ${status}`);
                }
                this.results = await response.json();
            } catch (error) {
                this.error = error.message;
            }
        }
    }
});
