import { checkoutPOM } from "../../pageobjects/checkout/checkout.page";
import { expect, Page } from "@playwright/test";

export class checkoutController {
    private CheckoutPOM: checkoutPOM;

    constructor(private page: Page) {
        this.CheckoutPOM = new checkoutPOM(page);
    }

    async assertCheckoutInfoHeaderText() {
        await expect(this.CheckoutPOM.headerCheckoutInformationText()).toBeVisible();
    }

    async inputFirstName(firstname: string) {
        await this.CheckoutPOM.fieldFirstName().fill(firstname);
    }

    async inputLastName(lastname: string) {
        await this.CheckoutPOM.fieldLastName().fill(lastname);
    }

    async inputPostalCode(postalcode: string) {
        await this.CheckoutPOM.fieldPostalCode().fill(postalcode);
    }

    async clickContinueButton() {
        await this.CheckoutPOM.continueCheckoutButton().click();
    }

    async assertCheckoutOverviewHeaderText() {
        await expect(this.CheckoutPOM.headerCheckoutOverviewText()).toBeVisible();
    }

    async assertItemSubtotal() {
        const priceElements = await this.CheckoutPOM.itemListPricesText().allTextContents();
        const itemListPricesText = priceElements.map(text => parseFloat(text.replace('$','')));
        const sum = itemListPricesText.reduce((a,b) => a + b, 0);

        const itemSubtotalText = await this.CheckoutPOM.itemSubtotalText().innerText();
        const subtotal = parseFloat(itemSubtotalText.replace(/[^\d.]/g, ''));

        await expect(subtotal).toBeCloseTo(sum, 2);
    }

    async assertItemTaxValue(taxdata: number) {
        const itemSubtotalText = await this.CheckoutPOM.itemSubtotalText().innerText();
        const itemTaxText = await this.CheckoutPOM.itemTaxText().innerText();

        const subtotal = parseFloat(itemSubtotalText.replace(/[^\d.]/g, ''));
        const tax = parseFloat(itemTaxText.replace(/[^\d.]/g, ''));

        const expectedTax = subtotal * taxdata;

        await expect(tax).toBeCloseTo(expectedTax, 2);
    }
    
    async assertItemTotalPrice() {
        const itemSubtotalText = await this.CheckoutPOM.itemSubtotalText().innerText();
        const itemTaxText = await this.CheckoutPOM.itemTaxText().innerText();
        const itemTotalPriceText = await this.CheckoutPOM.itemTotalPriceText().innerText();
        
        const subtotal = parseFloat(itemSubtotalText.replace(/[^\d.]/g, ''));
        const tax = parseFloat(itemTaxText.replace(/[^\d.]/g, ''));
        const totalPrice = parseFloat(itemTotalPriceText.replace(/[^\d.]/g, ''));

        await expect(totalPrice).toBeCloseTo(subtotal + tax, 2);
    }

    async clickFinishButton() {
        await this.CheckoutPOM.finishCheckoutButton().click();
    }
    
    async assertCheckoutCompletedHeader() {
        await expect(this.CheckoutPOM.headerCheckoutCompletedText()).toBeVisible();
    }

    async assertIconCheckoutCompleted() {
        await expect(this.CheckoutPOM.iconCheckoutCompleted()).toBeVisible();
    }

    async assertTitleCheckoutCompleted() {
        await expect(this.CheckoutPOM.titleCheckoutCompletedText()).toBeVisible();
    }

    async assertSubtitleCheckoutCompleted() {
        await expect(this.CheckoutPOM.subtitleCheckoutCompletedText()).toBeVisible();
    }

    async clickBackHomeButton() {
        await this.CheckoutPOM.backHomeButton().click();
    }
}