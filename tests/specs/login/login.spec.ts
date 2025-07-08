import { test } from '@playwright/test';
import { utilityController } from '../../controllers/utils/utils.controller';
import { loginUseCase } from '../../usecases/auth/login.usecase';
import { dataVar } from '../../resources/data/variables.data';
import { webUrl } from '../../resources/enums/webUrl';

let LoginUseCase: loginUseCase;
let UtilityController: utilityController;

test.describe('SauceLabs Login Scenario', () => {
    test.beforeEach(async ({ page }) => {
        LoginUseCase = new loginUseCase(page);
        UtilityController = new utilityController(page);
        await UtilityController.accessUrl(webUrl.prod);
    });

    test("Login Success with Valid Credentials", {tag:'@success'}, async () => {
        await LoginUseCase.loginValid(dataVar.validUsername, dataVar.validPassword);
    });
});
