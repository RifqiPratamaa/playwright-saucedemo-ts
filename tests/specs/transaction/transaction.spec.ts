import { test, Page } from '@playwright/test';
import { utilityController } from '../../controllers/utils/utils.controller';
import { loginUseCase } from '../../usecases/auth/login.usecase';
import { dataVar } from '../../resources/data/variables.data';
import { webUrl } from '../../resources/enums/webUrl';
import { dashboardController } from '../../controllers/dashboard/dashboard.controller';
import { cartController } from '../../controllers/cart/cart.controller';
import { checkoutController } from '../../controllers/checkout/checkout.controller';
import { logoutUseCase } from '../../usecases/auth/logout.usecase';

let page: Page;
let LoginUseCase: loginUseCase;
let UtilityController: utilityController;
let DashboardController: dashboardController;
let CartController: cartController;
let CheckoutController: checkoutController;
let LogoutUseCase: logoutUseCase;

test.describe.configure({ mode: 'serial' });

test.describe('SauceLabs Transaction Scenario', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        LoginUseCase = new loginUseCase(page);
        DashboardController = new dashboardController(page);
        CartController = new cartController(page);
        CheckoutController = new checkoutController(page);
        UtilityController = new utilityController(page);
        LogoutUseCase = new logoutUseCase(page);

        await UtilityController.accessUrl(webUrl.prod);
    });

    test("Login with Valid Credentials", async () => {
        await LoginUseCase.loginValid(dataVar.validUsername, dataVar.validPassword);
    });

    test("Add item to cart and verify badge", async () => {
        await DashboardController.clickItemAddToCart(dataVar.inventoryItemName);
        await DashboardController.clickItemAddToCart("Sauce Labs Bike Light");
        
        //assertion badge counter
        await DashboardController.assertCartBadgeCounter('2');
    });

    test("Remove item from cart", async () => {
        await DashboardController.clickCartButton();

        //assertion Cart page
        await CartController.assertCartHeaderText();

        await CartController.clickRemoveCartButton(dataVar.inventoryItemName);

        //assertion item removed and badge counter decreased
        await CartController.assertListDeleted(dataVar.inventoryItemName);
        await DashboardController.assertCartBadgeCounter('1');
    });

    test("Complete Checkout and Order Flow", async () => {
        await CartController.clickCheckoutButton();

        //assertion Checkout page
        await CheckoutController.assertCheckoutInfoHeaderText();

        await CheckoutController.inputFirstName(dataVar.firstName);
        await CheckoutController.inputLastName(dataVar.lastName);
        await CheckoutController.inputPostalCode(dataVar.postalCode);
        await CheckoutController.clickContinueButton();

        //assertion Overview page
        await CheckoutController.assertCheckoutOverviewHeaderText();

        //assertion item prices
        await CheckoutController.assertItemSubtotal();
        await CheckoutController.assertItemTaxValue(dataVar.taxRate);
        await CheckoutController.assertItemTotalPrice();

        await CheckoutController.clickFinishButton();

        //assertion Checkout completed
        await CheckoutController.assertCheckoutCompletedHeader();
        await CheckoutController.assertIconCheckoutCompleted();
        await CheckoutController.assertTitleCheckoutCompleted();
        await CheckoutController.assertSubtitleCheckoutCompleted();

        await CheckoutController.clickBackHomeButton();

        //assertion redirected to Dashboard page menu
        await DashboardController.assertDashboardHeaderText();
    });

    test("Log Out", async () => {
        await LogoutUseCase.logout();
    });
});
