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
        },
        async addResult(result) {
            const existingResult = this.results.find(r =>
                parseInt(r.studentId) === parseInt(result.studentId) &&
                r.vak.toUpperCase() === result.vak.toUpperCase()
            );

            if (existingResult) {
                this.error = 'Result already exists.';
                console.log("Course already exists");
            }else{
                try {

                    const response = await fetch('http://localhost:3000/results', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...result,
                            studentId: parseInt(result.studentId),
                            cijfer: parseInt(result.cijfer)
                        }),
                    });
                    if (!response.ok) {
                        let status = response.status;
                        throw new Error(`error status code ${status}`);
                    }
                    const newResult = await response.json();
                    this.results.push(newResult);
                } catch (error) {
                    this.error = error.message;
                }
            }
        }
    }
});
