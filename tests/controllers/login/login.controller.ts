import { loginPOM } from "../../pageobjects/login/login.page";
import { expect, Page } from "@playwright/test";

export class loginController {
    private LoginPOM: loginPOM;

    constructor(private page: Page) {
        this.LoginPOM = new loginPOM(page);
    }

    async inputUsername(username: string) {
        await this.LoginPOM.fieldUsername().fill(username);
    }

    async inputPassword(password: string) {
        await this.LoginPOM.fieldPassword().fill(password);
    }

    async clickLoginButton() {
        await this.LoginPOM.buttonLogin().click();
    }

    async assertLoginPageHeader() {
        await expect(this.LoginPOM.loginPageHeaderText()).toBeVisible();
    }
}