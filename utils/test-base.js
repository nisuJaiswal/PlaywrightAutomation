const { test } = require("@playwright/test");

const customProp = test.extend({
  customData: {
    email: "anshika@gmail.com",
    password: "Iamking@000",
    targetProduct: "iphone",
  },
});

module.exports = { customProp };
