import { Page } from "@playwright/test";
import { dashboardController } from "../../controllers/dashboard/dashboard.controller";
import { loginController } from "../../controllers/login/login.controller";

export class logoutUseCase {
    constructor(private page: Page) {}

    async logout() {
        const LoginController = new loginController(this.page);
        const DashboardController = new dashboardController(this.page);

        await DashboardController.clickSideMenuButton();
        await DashboardController.clickLogoutButton();

        //assertion redirected to Login page
        await LoginController.assertLoginPageHeader();
    }
}