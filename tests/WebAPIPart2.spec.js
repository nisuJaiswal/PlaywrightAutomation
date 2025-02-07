import { test, expect } from "@playwright/test";
const email = "anshika@gmail.com";
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("input#userEmail").fill(email);
  await page.locator("input#userPassword").fill("Iamking@000");

  await page.locator("#login").click();

  await page.waitForLoadState("networkidle");
  context.storageState({ path: "./storage.json" });

  webContext = await browser.newContext({
    storageState: "./storage.json",
  });
});

test("API Assingment of Client App", async () => {
  // Search for product

  const targetProduct = "IPHONE 13 PRO";

  // Waiting for let the page load the products on the screen
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
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

      // await page
      //   .locator(".card-body")
      //   .nth(i + 1)
      //   .locator("text= Add To Cart")
      //   .click();
      break;
    }
  }

  // Goint to the cart page
  await page.locator(".btn-custom").nth(2).click();

  // Searching for the recently added product
  let foundAddedItem =
    (await page.locator(".items h3").first().textContent()) === targetProduct;

  expect(foundAddedItem).toBeTruthy();

  // Clicking on the Checkout
  await page.locator(".btn-primary").last().click();

  // Filling out the form values
  await page.locator('input[type="text"]').nth(1).fill("000");

  // Validating the email with the logged in email
  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  // Selecting INDIA county
  await page.locator(".text-validated").last().pressSequentially("ind");

  const countyOptions = page.locator(".list-group");
  await countyOptions.waitFor();

  const countyNumbers = await countyOptions.locator("button").count();

  for (let i = 0; i < countyNumbers; i++) {
    let txt = await countyOptions.locator("button").nth(i).textContent();
    if (txt.trim() === "India") {
      await countyOptions.locator("button").nth(i).click();
      // await page.pause();
      break;
    }
  }
  // Applying coupon code

  await page.locator("[name='coupon']").fill("rahulshettyacademy");
  await page.locator("[type='submit']").click();

  // Clicking on the order
  await page.locator("text=PLACE ORDER").click();

  // Asserting Thank you message
  expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  // Extracting id
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .first()
    .textContent();

  // console.log(orderId);

  // Going to orders page
  await page.locator("[routerlink='/dashboard/myorders']").first().click();

  // Accessing all the order rows
  await page.locator("tbody").waitFor();
  const allOrders = page.locator("tr.ng-star-inserted");

  const ordersCount = await allOrders.count();

  for (let i = 0; i < ordersCount; i++) {
    let tempOrderId = await allOrders.nth(i).locator("th").textContent();
    // console.log(tempOrderId);
    if (orderId.includes(tempOrderId)) {
      // await page.pause();
      // Going to the order page
      await allOrders.nth(i).locator("button").first().click();
      break;
    }
  }

  expect(
    orderId.includes(await page.locator(".col-text").textContent())
  ).toBeTruthy();
});
