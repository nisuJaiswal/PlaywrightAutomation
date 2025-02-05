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

  const firstElement = page.locator(".card-title").first();

  console.log(await firstElement.textContent());
});
