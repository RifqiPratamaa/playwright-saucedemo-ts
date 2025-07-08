import { dashboardPOM } from "../../pageobjects/dashboard/dashboard.page";
import { expect, Page } from "@playwright/test";

export class dashboardController {
    private DashboardPOM: dashboardPOM;

    constructor(private page: Page) {
        this.DashboardPOM = new dashboardPOM(page);
    }

    async assertDashboardHeaderText() {
        await expect(this.DashboardPOM.headerProductText()).toBeVisible();
    }

    async clickItemAddToCart(itemName: string) {
        await this.DashboardPOM.buttonAddToCart(itemName).click();
    }

    async clickCartButton() {
        await this.DashboardPOM.buttonCartDefault().click();
    }

    async assertCartBadgeCounter(counter: string) {
        await expect(this.DashboardPOM.badgeCartCounter()).toHaveText(counter);
    }

    async clickSideMenuButton() {
        await this.DashboardPOM.sideMenuButton().click();
    }

    async clickLogoutButton() {
        await this.DashboardPOM.logoutButton().click();
    }
}