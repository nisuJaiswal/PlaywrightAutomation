import { expect, test } from "@playwright/test";

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

  const text = await anotherPage.locator(".red").textContent();
  const emailValue = text.split("@")[1].split(" ")[0];

  await page.locator("input#username").fill(emailValue);

  // await page.pause();
});

test.only("Assingment of Client App", async ({ page }) => {
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
      // Adding the target intem into the cart
      await page
        .locator(".card-body")
        .nth(i)
        .locator("text= Add To Cart")
        .click();

      await page
        .locator(".card-body")
        .nth(i + 1)
        .locator("text= Add To Cart")
        .click();
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

  console.log(orderId);
});
