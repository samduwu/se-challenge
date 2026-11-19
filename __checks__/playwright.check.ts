import { CheckGroupV2, Frequency } from "checkly/constructs"

// Define a check group for the playwright tests
const playwrightGroup = new CheckGroupV2("playwright-group", {
  name: "Playwright Test Group",
  activated: true,
  locations: ["us-east-1", "eu-west-1"],
  browserChecks: {
    frequency: Frequency.EVERY_1H,
    testMatch: "../playwright-tests/**/*.spec.ts",
  },
});
