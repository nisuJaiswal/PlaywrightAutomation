class Dashboard {
  constructor(page) {
    this.page = page;
    this.cards = page.locator(".card-body");

    this.cartButton = page.locator(".btn-custom").nth(2);
  }

  async navigateToCart() {
    await this.cartButton.click();
  }

  async addProductToCart(targetProduct) {
    const cardCount = await this.cards.count();

    // Searching for the target product
    for (let i = 0; i < cardCount; i++) {
      if (
        (await this.cards.nth(i).locator("b").textContent()) === targetProduct
      ) {
        // Adding the target item into the cart
        await this.cards.nth(i).locator("text= Add To Cart").click();

        // await page
        //   .locator(".card-body")
        //   .nth(i + 1)
        //   .locator("text= Add To Cart")
        //   .click();
        break;
      }
    }
  }
}

module.exports = { Dashboard };
