import { Locator, Page } from "@playwright/test";

const { expect } = require("@playwright/test");

export class CheckoutPage {
  page: Page
  checkoutButton: Locator
  creditCard: Locator
  emailField: Locator
  countyCombobox: Locator
  countyDropdown: Locator
  couponInput: Locator
  couponSubmit: Locator
  placeOrderButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator(".btn-primary").last();
    this.creditCard = page.locator('input[type="text"]').nth(1);
    this.emailField = page.locator(".user__name [type='text']").first();
    this.countyCombobox = page.locator(".text-validated").last();
    this.countyDropdown = page.locator(".list-group");
    this.couponInput = page.locator("[name='coupon']");
    this.couponSubmit = page.locator("[type='submit']");
    this.placeOrderButton = page.locator("text=PLACE ORDER");
  }

  async checkForAddedItem(targetProduct: string) {
    let foundAddedItem =
      (await this.page.locator(".items h3").first().textContent()) ===
      targetProduct;

    expect(foundAddedItem).toBeTruthy();
  }

  async navigateToCheckout() {
    await this.checkoutButton.click();
  }

  async navigateToOrderDetails() {
    await this.placeOrderButton.click();
  }
  async fillCheckoutDetails(email) {
    await this.creditCard.fill("000");

    // Validating the email with the logged in email
    expect(this.emailField).toHaveText(email);

    // Selecting INDIA county
    await this.countyCombobox.pressSequentially("ind");

    const countyOptions = this.countyDropdown;
    await countyOptions.waitFor();

    const countyNumbers = await countyOptions.locator("button").count();

    for (let i = 0; i < countyNumbers; i++) {
      let txt: any = await countyOptions.locator("button").nth(i).textContent();
      if (txt.trim() === "India") {
        await countyOptions.locator("button").nth(i).click();
        // await page.pause();
        break;
      }
    }
    // Applying coupon code
    await this.couponInput.fill("rahulshettyacademy");
    await this.couponSubmit.click();
  }
}
