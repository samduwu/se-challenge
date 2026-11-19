import { EmailAlertChannel } from 'checkly/constructs'

// Define the email(s) to notify for failures
export const email = new EmailAlertChannel("team-email", {
  address: "raccoon@checklyhq.com",
  sendFailure: true,
});
