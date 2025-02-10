// const { test } = require("@playwright/test");
import { test as basesTest } from "@playwright/test"
interface CustomData {
  email: string
  password: string
  targetProduct: string
}
export const customProp = basesTest.extend<{customData: CustomData}>({
  customData: {
    email: "anshika@gmail.com",
    password: "Iamking@000",
    targetProduct: "zara",
  },
});

