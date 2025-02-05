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
test.only("UI Components Testing", async ({ page }) => {
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
