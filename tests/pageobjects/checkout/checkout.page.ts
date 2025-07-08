import { Page } from "@playwright/test";

export class checkoutPOM {
    constructor (private page : Page) {}

    headerCheckoutInformationText() {
        return this.page.locator('//*[text()="Checkout: Your Information"]')
    }

    headerCheckoutOverviewText() {
        return this.page.locator('//*[text()="Checkout: Overview"]')
    }

    fieldFirstName() {
        return this.page.locator('[data-test="firstName"]')
    }

    fieldLastName() {
        return this.page.locator('[data-test="lastName"]')
    }

    fieldPostalCode() {
        return this.page.locator('[data-test="postalCode"]')
    }

    cancelCheckoutButton() {
        return this.page.locator('[data-test="cancel"]')
    }

    continueCheckoutButton() {
        return this.page.locator('[data-test="continue"]')
    }

    itemListPricesText() {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    itemSubtotalText() {
        return this.page.locator('[data-test="subtotal-label"]');
    }

    itemTaxText() {
        return this.page.locator('[data-test="tax-label"]');
    }

    itemTotalPriceText() {
        return this.page.locator('[data-test="total-label"]');
    }

    finishCheckoutButton() {
        return this.page.locator('[data-test="finish"]');
    }
    
    headerCheckoutCompletedText() {
        return this.page.locator('//*[text()="Checkout: Complete!"]')
    }

    iconCheckoutCompleted() {
        return this.page.locator('[data-test="pony-express"]');
    }

    titleCheckoutCompletedText() {
        return this.page.locator('//*[text()="Thank you for your order!"]')
    }

    subtitleCheckoutCompletedText() {
        return this.page.locator('[data-test="complete-text"]');
    }

    backHomeButton() {
    return this.page.locator('[data-test="back-to-products"]');
    }
}