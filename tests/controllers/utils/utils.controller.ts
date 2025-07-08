import { Page } from "@playwright/test";

export class utilityController {
    constructor(private page: Page) {}

    async accessUrl(url: string) {
        await this.page.goto(url);
        await this.page.waitForLoadState();
    }
}