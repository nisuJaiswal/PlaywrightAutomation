import test, { expect } from "@playwright/test";

const email = "anshika@gmail.com";

test("Manipulating Network res", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("input#userEmail").fill(email);
  await page.locator("input#userPassword").fill("Iamking@000");

  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");

  const targetProduct = "IPHONE 13 PRO";

  // Waiting for let the page load the products on the screen
  //   const page = await webContext.newPage();
  //   await page.goto("https://rahulshettyacademy.com/client");
  const cardCount = await page.locator(".card-body").count();

  // Searching for the target product
  for (let i = 0; i < cardCount; i++) {
    if (
      (await page.locator(".card-body").nth(i).locator("b").textContent()) ===
      targetProduct
    ) {
      // Adding the target item into the cart
      await page
        .locator(".card-body")
        .nth(i)
        .locator("text= Add To Cart")
        .click();

      break;
    }
  }

  const dummyRes = { data: [], message: "No Product in Cart" };

  await page.route(
    // * represents any id can be there
    "https://rahulshettyacademy.com/api/ecom/user/get-cart-products/*",
    async (route) => {
      const res = await page.request.fetch(route.request());
      //   res.body = dummyRes;

      await route.fulfill({
        response: res,
        body: JSON.stringify(dummyRes),
      });
    }
  );

  // Goint to the cart page
  await page.locator(".btn-custom").nth(2).click();

  expect(page.getByText("No Products in Your Cart !")).toBeVisible();
  //   await page.pause();
});
