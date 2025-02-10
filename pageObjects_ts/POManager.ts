
import { type Page} from "@playwright/test"
import { LoginPage } from "./LoginPage";
import { Dashboard } from "./DashboardPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderPage } from "./OrderPage";

export class POManager {
  page: Page
  loginPage: LoginPage
  dashboardPage: Dashboard
  checkoutPage: CheckoutPage
  orderPage: OrderPage


  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new Dashboard(page);
    this.checkoutPage = new CheckoutPage(page);
    this.orderPage = new OrderPage(page);
  }
  getLoginPage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrderPage() {
    return this.orderPage;
  }
}
