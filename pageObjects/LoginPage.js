class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("input#userEmail");
    this.password = page.locator("input#userPassword");
    this.loginButton = page.locator("#login");
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async login(usernameValue, passwordValue) {
    await this.username.fill(usernameValue);
    await this.password.fill(passwordValue);
    await this.loginButton.click();
  }
}
module.exports = { LoginPage };
