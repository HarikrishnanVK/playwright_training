import { test, expect } from "@playwright/test";
import { sample_test } from "../page/sample_test.page";
import { TestData } from "../test_data.json"

let sampleTest: sample_test;

test.beforeEach(async ({ page, context }) => {
    sampleTest = new sample_test(page, context);
    await page.goto("https://www.bupa.com/");
    await sampleTest.VerifyURL('https://www.bupa.com/');

    // await page.waitForLoadState();
    // let sourceURL: string = page.url();
    // expect(sourceURL).toEqual('https://www.bupa.com/');
});

test.describe('set of sample cases', () => {
    test('verify navigation of our strategy page', async ({ page, context }) => {
        sampleTest = new sample_test(page, context);
        await sampleTest.MouseHoverOnMenu("Our Bupa");
        await sampleTest.ClickOnMenuItem("Our Strategy");
        await sampleTest.VerifyURL('https://www.bupa.com/our-bupa/our-strategy');
        
        // await page.hover(`li[id='nav-our-bupa-level1'] > a[href='/our-bupa']`);
        // await page.click(`li[role='menuitem'] a[href*='our-strategy']`);
        // await page.waitForLoadState();
        // let expectedURL: string = page.url();
        // console.log(`url captured is ${expectedURL}`);
        // expect(expectedURL).toEqual('https://www.bupa.com/our-bupa/our-strategy');
    });

    test('verify navigation of our markets page', async ({ page, context }) => {
        sampleTest = new sample_test(page, context);
        await sampleTest.MouseHoverOnMenu("What we do");
        await sampleTest.ClickOnMenuItem("Our Markets");
        await sampleTest.VerifyURL('https://www.bupa.com/what-we-do/our-markets');

        // await page.hover(`li[id='nav-what-we-do-level1'] > a[href*='/what-we-do']`);
        // await page.click(`//li[@role='menuitem']//a[contains(@href,'our-markets')]`);
        // await page.waitForLoadState();
        // let expectedURL: string = page.url();
        // expect(expectedURL).toEqual('https://www.bupa.com/what-we-do/our-markets');
    });
});

TestData.forEach(data => {
    test.describe(`data driven test suite ${data.countryLink}`, () => {
        test('verify locations of the site', async ({ page, context }) => {
            sampleTest = new sample_test(page, context);
            await sampleTest.ClickContactList();
            await sampleTest.SelectCountriesFromList(data.countryName);
            await sampleTest.OpenLocationLink(data.countryName);
            await sampleTest.VerifyLocation(data.countryLink);
        });
    });
});