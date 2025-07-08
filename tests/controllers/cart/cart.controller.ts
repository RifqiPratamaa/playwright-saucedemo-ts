import { cartPOM } from "../../pageobjects/cart/cart.page";
import { expect, Page } from "@playwright/test";

export class cartController {
    private CartPOM: cartPOM;

    constructor(private page: Page) {
        this.CartPOM = new cartPOM(page);
    }

    async assertCartHeaderText() {
        await expect(this.CartPOM.headerCartText()).toBeVisible();
    }

    async clickRemoveCartButton(itemName: string) {
        await this.CartPOM.buttonRemoveCart(itemName).click();
    }

    async assertListDeleted(itemName: string) {
        await expect(this.CartPOM.cartItemList(itemName)).not.toBeVisible();
    }

    async clickCheckoutButton() {
        await this.CartPOM.buttonCheckout().click();
    }
}