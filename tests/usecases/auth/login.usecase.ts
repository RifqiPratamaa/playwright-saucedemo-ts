import { Page } from "@playwright/test";
import { loginController } from "../../controllers/login/login.controller";
import { dashboardController } from "../../controllers/dashboard/dashboard.controller";

export class loginUseCase {
    constructor(private page: Page) {}

    async loginValid(username: string, password: string) {
        const LoginController = new loginController(this.page);
        const DashboardController = new dashboardController(this.page);

        await LoginController.inputUsername(username);
        await LoginController.inputPassword(password);
        await LoginController.clickLoginButton();

        //assertion
        await DashboardController.assertDashboardHeaderText();
    }
}