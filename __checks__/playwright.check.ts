import { CheckGroupV2, EmailAlertChannel, Frequency } from "checkly/constructs"

// Define the email(s) to notify for failures
const email = new EmailAlertChannel("team-email", {
  address: "samduwu1@gmail.com", // TODO: Change this to user email
  sendFailure: true,
});

// Define a check group for the playwright tests
const group = new CheckGroupV2("playwright-group", {
  name: "Playwright Test Group",
  activated: true,
  locations: ["us-east-1", "eu-west-1"],
  alertChannels: [email],
  browserChecks: {
    frequency: Frequency.EVERY_1H,
    testMatch: "../playwright-tests/**/*.spec.ts",
  },
});
