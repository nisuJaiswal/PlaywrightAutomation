const { When, Given, Then } = require("@cucumber/cucumber");

Given(
  "a login to Ecommerce website with credentials {string} and {string}",
  async function (email, password) {
    const prod = await this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.login(email, password);
  }
);
When("Add {string} to cart", async function (product) {
  this.dashboardPage = this.poManager.getDashboardPage();
  // console.log(this.dashboardPage);
  // Waiting for let the page load the products on the screen
  await this.page.waitForLoadState("networkidle");

  await this.dashboardPage.addProductToCart(product);
});

Then("Verify {string} is displayed in the cart", async function (product) {
  await this.dashboardPage.navigateToCart();

  this.checkoutPage = this.poManager.getCheckoutPage();

  // Searching for the recently added product
  await this.checkoutPage.checkForAddedItem(product);
});

When("Enter valid details, {string} and place order", async function (email) {
  await this.checkoutPage.navigateToCheckout();

  // Filling out the form values
  await this.checkoutPage.fillCheckoutDetails(email);

  // Clicking on the order
  await this.checkoutPage.navigateToOrderDetails();

  // Asserting Thank you message
  this.orderPage = this.poManager.getOrderPage();
  await this.orderPage.checkforThankyouMsg();

  // Extracting id
  await this.orderPage.getOrderId();
});

Then("Verify order in present history of orders", async function () {
  await this.orderPage.navigateToOrderHistory();

  // Accessing all the order rows
  await this.page.locator("tbody").waitFor();

  await this.orderPage.validateOrder();
});
