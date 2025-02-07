const { expect } = require("@playwright/test");

class OrderPage {
  constructor(page) {
    this.page = page;
    this.thankyouMsg = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted").first();
    this.orderHistory = page
      .locator("[routerlink='/dashboard/myorders']")
      .first();
    this.allOrder = page.locator("tr.ng-star-inserted");
  }
  async checkforThankyouMsg() {
    expect(this.thankyouMsg).toHaveText(" Thankyou for the order. ");
  }

  async getOrderId() {
    const orderIdContent = await this.orderId.textContent();
    console.log(
      "============================================================="
    );

    console.log(orderIdContent);
    // return orderIdContent;
    this.orderedProductId = orderIdContent;
  }

  async navigateToOrderHistory() {
    await this.orderHistory.click();
  }

  async validateOrder() {
    const ordersCount = await this.allOrder.count();
    // await this.page.pause();
    for (let i = 0; i < ordersCount; i++) {
      let tempOrderId = await this.allOrder.nth(i).locator("th").textContent();
      console.log(tempOrderId + "   " + this.orderedProductId);

      if (this.orderedProductId.includes(tempOrderId)) {
        await this.allOrder.nth(i).locator("button").first().click();
        break;
      }
    }

    expect(
      await this.orderedProductId.includes(
        await this.page.locator(".col-text").textContent()
      )
    ).toBeTruthy();
  }
}

module.exports = { OrderPage };
