const { CheckoutPage } = require("./CheckoutPage");
const { Dashboard } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderPage } = require("./OrderPage");

class POManager {
  constructor(page) {
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

module.exports = { POManager };
