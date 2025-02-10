const playwright = require("@playwright/test");
const { Before, After } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
Before(async function () {
  const browser = await playwright.chromium.launch({ headless: false });

  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});
After(() => console.log("Execution Completed..."));
