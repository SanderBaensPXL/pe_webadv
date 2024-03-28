const puppeteer = require('puppeteer');

describe('End-to-End Tests', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should add a new student', async () => {
        await page.goto('http://localhost:5173/add-student'); // Replace with your Vue app's URL

        // Simulate filling out the form to add a new student
        await page.type('#first_name_input', 'John');
        await page.type('#last_name_input', 'Doe');

        await page.click('.v-field__append-inner');

// Wait for the dropdown to appear
        await page.waitForSelector('.v-select-list');

// Select an option from the dropdown (replace 'male' or 'female' with the value of the option you want to select)
        const optionValue = 'male'; // or 'female'
        await page.click(`.v-select-list [data-value="${optionValue}"]`);
        await page.click('#submit');

        // Wait for the student list to update
        await page.waitForSelector('.student-list-item');

        // Verify that the new student is added to the list
        const studentList = await page.$$('.student-list-item');
        expect(studentList.length).toBeGreaterThan(0);
    }, 10000);

    test('should add a result for a student', async () => {
        // Simulate navigating to a specific student's page
        await page.click('.student-list-item:first-child');

        // Simulate adding a result for the student
        await page.type('#vak', 'Math');
        await page.type('#cijfer', '90');
        await page.click('#submit-button');

        // Wait for the results list to update
        await page.waitForSelector('.result-item');

        // Verify that the new result is added to the list
        const resultList = await page.$$('.result-item');
        expect(resultList.length).toBeGreaterThan(0);
    });

    // Add more test cases as needed
});