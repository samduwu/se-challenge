import { AlertEscalationBuilder, BrowserCheck,  CheckGroupV2, Frequency } from "checkly/constructs"
import { email } from '../alert-channels'

// Define a check group for the playwright tests
const playwrightGroup = new CheckGroupV2("playwright-group", {
  name: "Playwright Test Group",
  activated: true,
  alertChannels: [email],
  alertEscalationPolicy: AlertEscalationBuilder.runBasedEscalation (
    1, // Alert after 1 failed run
    { interval: 5, amount: 0 }, // No reminders
  ),
  locations: ["us-east-1", "eu-west-1"],
  browserChecks: {
    frequency: Frequency.EVERY_1H,
    testMatch: "../playwright-tests/**/*.spec.ts",
  },
});
