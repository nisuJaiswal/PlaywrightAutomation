import { test } from "@playwright/test";

test("Using Browser Method", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://google.com");
});

test("Using Default Parameter", async ({ browser, page }) => {
  await page.goto("https://www.youtube.com/");
});
