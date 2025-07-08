import { Page } from "@playwright/test";

export class loginPOM {
    constructor (private page : Page) {}

    fieldUsername() {
        return this.page.locator('[data-test="username"]')
    }

    fieldPassword() {
        return this.page.locator('[data-test="password"]')
    }

    buttonLogin() {
       return this.page.getByRole('button', { name: 'LOGIN' })
    }

    errorLoginText() {
        return this.page.locator('//h3')
    }

    loginPageHeaderText() {
        return this.page.getByText('Swag Labs')
    }
}