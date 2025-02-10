import { expect, test } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { Dashboard } from "../pageObjects/DashboardPage";
import { CheckoutPage } from "../pageObjects/CheckoutPage";
import { customProp } from "../utils_ts/test-base";
import {POManager} from "../pageObjects_ts/POManager"

// Testing using Browser method (Long)
// test("Using Browser Method", async ({ browser }) => {
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto("https://google.com");

//   console.log(await page.title());

//   await expect(page).toHaveTitle("Google");
// });

// test("Using Default Parameter", async ({ browser, page }) => {
//   await page.goto("https://www.youtube.com/");

//   console.log(await page.title());
//   await expect(page).toHaveTitle("YouTube");
// });

// Interacting with inputs:

test("Logging in with wrong credentials", async ({ page }) => {
  const errorMsg = page.locator("[style*='none']");
  const username = page.locator("input#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await username.fill("Nisu Jaiswal");
  await page.locator("[name = 'password']").fill("learning");
  await page.locator("[type='submit']").click();

  console.log(await errorMsg.textContent());

  expect(errorMsg).toContainText("Incorrect");
});

// Logging in with right credentials
test("Logging in with correct credentials", async ({ page }) => {
  const username = page.locator("input#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await username.fill("rahulshettyacademy");
  await page.locator("[name = 'password']").fill("learning");
  await page.locator("[type='submit']").click();

  // Get specific element
  const firstElement = await page.locator(".card-body a").nth(3).textContent();

  //   Added this to letting the list loaded
  await page.locator(".card-body a").first();

  const allElements = await page.locator(".card-body a").allTextContents();

  //   const allElements = await page.locator(".card-body a").allTextContents();

  console.log(allElements);
});

// UI Components (Radio and Checkbox)
test("UI Components Testing", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  await page.locator("input#username").fill("rahulshettyacademy");
  await page.locator("[name = 'password']").fill("learning");

  await page.locator("[data-style=btn-info]").selectOption("teach");

  await page.locator(".radiotextsty").last().click();
  //   Assertion for radio button
  expect(await page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#okayBtn").click();

  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();

  //   await page.pause();

  await page.locator("[type='submit']").click();
});

// Handling the child window
test("Child Window Management", async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [anotherPage] = await Promise.all([
    ctx.waitForEvent("page"),
    page.locator("[href*='documents-request']").click(),
  ]);

  const text:string = (await anotherPage.locator(".red").textContent())!;
  const emailValue = text.split("@")[1].split(" ")[0];

  await page.locator("input#username").fill(emailValue);

  // await page.pause();
});

test("Assingment of Client App", async ({ page }) => {
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(email, password);
  // Search for product

  const targetProduct = "zara";

  const dashboardPage = poManager.getDashboardPage();

  // Waiting for let the page load the products on the screen
  await page.waitForLoadState("networkidle");

  await dashboardPage.addProductToCart(targetProduct);

  // Goint to the cart page
  await dashboardPage.navigateToCart();

  const checkoutPage = poManager.getCheckoutPage();

  // Searching for the recently added product
  await checkoutPage.checkForAddedItem(targetProduct);

  // Clicking on the Checkout
  await checkoutPage.navigateToCheckout();

  // Filling out the form values
  await checkoutPage.fillCheckoutDetails(email);

  // Clicking on the order
  await checkoutPage.navigateToOrderDetails();

  // Asserting Thank you message
  const orderPage = poManager.getOrderPage();
  await orderPage.checkforThankyouMsg();

  // Extracting id
  await orderPage.getOrderId();

  // Going to orders page
  await orderPage.navigateToOrderHistory();

  // Accessing all the order rows
  await page.locator("tbody").waitFor();

  await orderPage.validateOrder();
});

// Screenshots
test("Comparing the snapshots", async ({ page }) => {
  await page.goto("https://google.com/");
  expect(await page.screenshot()).toMatchSnapshot("google.png");
});
test("aAssingment of Client App", async ({ page }) => {
  const email = "anshika@gmail.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("input#userEmail").fill(email);
  await page.locator("input#userPassword").fill("Iamking@000");

  await page.locator("#login").click();

  // Search for product

  const targetProduct = "IPHONE 13 PRO";

  // Waiting for let the page load the products on the screen
  await page.waitForLoadState("networkidle");

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
    if (txt?.trim() === "India") {
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

  await page.pause();
  // Extracting id
  const orderId:any = await page
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

customProp.only("Using custom Props", async ({ page, customData }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(customData.email, customData.password);
  // Search for product

  // const targetProduct = "IPHONE 13 PRO";

  const dashboardPage = poManager.getDashboardPage();

  // Waiting for let the page load the products on the screen
  await page.waitForLoadState("networkidle");

  await dashboardPage.addProductToCart(customData.targetProduct);

  // Goint to the cart page
  await dashboardPage.navigateToCart();

  const checkoutPage = poManager.getCheckoutPage();

  // Searching for the recently added product
  await checkoutPage.checkForAddedItem(customData.targetProduct);

  // Clicking on the Checkout
  await checkoutPage.navigateToCheckout();

  // Filling out the form values
  await checkoutPage.fillCheckoutDetails(customData.email);
});
