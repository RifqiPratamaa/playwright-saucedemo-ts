import { Page } from "@playwright/test";

export class dashboardPOM {
    constructor (private page : Page) {}

    headerProductText() {
        return this.page.locator('//*[text()="Products"]')
    }

    buttonAddToCart(product: string) {
        return this.page.locator(`//*[text()="${product}"]//ancestor::div[2]//button`)
    }

    buttonCartDefault() {
        return this.page.locator('//*[@data-test="shopping-cart-link"]')
    }

    badgeCartCounter() {
        return this.page.locator('//*[@data-test="shopping-cart-badge"]')
    }

    sideMenuButton() {
        return this.page.getByRole('button', { name: 'Open Menu' })
    }

    logoutButton() {
        return this.page.locator('[data-test="logout-sidebar-link"]')
    }
}