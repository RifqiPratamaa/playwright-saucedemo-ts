import { Page } from "@playwright/test";

export class cartPOM {
    constructor (private page : Page) {}

    headerCartText() {
        return this.page.locator('//*[text()="Your Cart"]')
    }

    cartItemList(product: string) {
        return this.page.locator(`//*[text()="${product}"]`)
    }

    buttonRemoveCart(product: string) {
        return this.page.locator(`//*[text()="${product}"]//ancestor::div[2]//button`)
    }

    buttonCheckout() {
        return this.page.locator('[data-test="checkout"]')
    }

    buttonContinueShopping() {
        return this.page.locator('[data-test="continue-shopping"]')
    }
}