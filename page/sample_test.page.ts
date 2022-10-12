import { BrowserContext, expect, Locator, Page } from "@playwright/test";

export class sample_test {

    private page: Page;
    private context: BrowserContext;

    constructor(pageObject: Page, browserObject: BrowserContext) {
        this.page = pageObject;
        this.context = browserObject;
    }

    /*selectors*/
    private ourBupaMenu = `li[id='nav-our-bupa-level1'] > a[href='/our-bupa']`;
    private ourStrategyMenuItem = `li[role='menuitem'] a[href*='our-strategy']`;
    private whatWeDoMenu = `li[id='nav-what-we-do-level1'] > a[href*='/what-we-do']`;
    private ourMarketsMenuItem = `//li[@role='menuitem']//a[contains(@href,'our-markets')]`;
    private contactsList = `a[class='websites']`;

    /*functions or methods*/
    private async FindElement(selector: string): Promise<Locator> {
        await this.page.waitForSelector(selector);
        return this.page.locator(selector);
    }

    async MouseHoverOnMenu(option: string) {
        switch (option.toLowerCase().replace(/\s/g, '')) {
            case "ourbupa":
                await (await this.FindElement(this.ourBupaMenu)).hover();
                break;
            case "whatwedo":
                await (await this.FindElement(this.whatWeDoMenu)).hover();
                break;
            default:
                throw new Error(`${option.toString()} mentioned is not present in the switch case`);
        }
    }

    async ClickOnMenuItem(option: string) {
        switch (option.toLowerCase().replace(/\s/g, '')) {
            case "ourstrategy":
                await (await this.FindElement(this.ourStrategyMenuItem)).click();
                break;
            case "ourmarkets":
                await (await this.FindElement(this.ourMarketsMenuItem)).click();
                break;
            default:
                throw new Error(`${option.toString()} mentioned is not present in the switch case`);
        }
    }

    async VerifyURL(URL: string) {
        await this.page.waitForLoadState();
        let expectedURL: string = this.page.url();
        expect(expectedURL).toEqual(URL);
    }

    async ClickContactList() {
        await (await this.FindElement(this.contactsList)).click();
    }

    async SelectCountriesFromList(country: string) {
        await this.page.selectOption(`select[id='select-box']`, country);
    }

    async OpenLocationLink(countryText: string) {
        await (await this.FindElement(`div[id='tab-${countryText}'] > div[class='website-button']  > a`)).click();
    }

    private async SwitchPage(): Promise<Page> {
        const [newWindow] = await Promise.all([
            await this.context.waitForEvent("page")
        ]);
        await newWindow.waitForLoadState();
        console.log(`switched to new window ${await newWindow.title()}`);
        return newWindow;
    };

    async VerifyLocation(countryLink: string) {
        let newPage =  await this.SwitchPage();
        let expectedURL: string = newPage.url();
        expect(expectedURL).toContain(countryLink);
    }

}