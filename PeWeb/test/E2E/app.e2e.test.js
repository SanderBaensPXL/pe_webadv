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
        await page.goto('http://localhost:5173/add-student');
        await page.type('#first_name_input', 'John');
        console.log("firstname put in");
        await page.type('#last_name_input', 'Doe');
        console.log("lastname put in");

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('#submit'),
        ]);

        await page.waitForSelector('.v-list-item-title', { text: 'John Doe'});
        }, 10000);

    test('submit button for addStudent is disabled when not all fields have been filled in', async () => {
        await page.goto('http://localhost:5173/add-student');
        await page.type('#first_name_input', 'John');
        const isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(true);
    }, 10000);

    test('submit button remains disabled when invalid values are entered', async () => {
        await page.goto('http://localhost:5173/add-student');
        let isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(true);

        await page.type('#first_name_input', 'John@');
        isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(true);

        await page.type('#last_name_input', 'Doe123');
        isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(true);

    }, 10000);

    test('submit button for addResult is disabled when not all fields have been filled in', async () => {
        await page.goto('http://localhost:5173/add-result/1');
        await page.type('#course_input', 'Math');
        const isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(true);
    }, 10000);

    test('submit button becomes enabled when a number is entered into the result input field', async () => {
        await page.goto('http://localhost:5173/add-result/1');

        await page.type('#course_input', 'Math');
        await page.evaluate(() => document.querySelector('#result_input').value = '');
        await page.type('#result_input', 'maths');
        let isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(true);

        await page.evaluate(() => document.querySelector('#result_input').value = '');
        await page.type('#result_input', '85');
        isSubmitButtonDisabled = await page.$eval('#submit', button => button.disabled);
        expect(isSubmitButtonDisabled).toBe(false);
    }, 10000);

    test('should add a new result', async () => {
        await page.goto('http://localhost:5173/add-result/1')

        await page.type('#course_input', 'Math');
        console.log("Course input put in");
        await page.type('#result_input', '85');
        console.log("Result input put in");

        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click('#submit'),
        ]);

        await page.waitForSelector('#resultsList .v-table__wrapper table tbody tr', { text: 'Math' });
        await page.waitForSelector('#resultsList .v-table__wrapper table tbody tr', { text: '85' });
    }, 10000);
});