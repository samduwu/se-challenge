
import { ApiCheck, AssertionBuilder, EmailAlertChannel, Frequency } from 'checkly/constructs'
import usersJSON from '../users-api.json'

// Define the email(s) to notify for failures
const email = new EmailAlertChannel("team-email", {
  address: "samduwu1@gmail.com", // TODO: Change this to user email
  sendFailure: true,
});

const users = usersJSON["users"];

for (const user of users) {
  // Create a unique api check for each item in the json file
  new ApiCheck(`api-user-${user.id}`, {
    activated: true,
    name: 'Users API',
    alertChannels: [email],
    frequency: Frequency.EVERY_1H,
    request: {
      url: `${user.profile_url}`,
      headers: [
        {
          key: 'Authorization',
          value: 'Bearer {{AUTH_TOKEN}}', 
        },
      ],
      method: 'GET',
      assertions: [
        AssertionBuilder.statusCode().equals(200),
        AssertionBuilder.jsonBody('$.id').equals(user.id),
        AssertionBuilder.jsonBody('$.name').equals(user.name),
      ],
    },
  })
};