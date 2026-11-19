import { ApiCheck, AssertionBuilder, CheckGroupV2, Frequency } from 'checkly/constructs'
import usersJSON from '../users-api.json'

// Define a check group for the api tests
const apiGroup = new CheckGroupV2("api-group", {
  name: "API Test Group",
  activated: true,
  locations: ["us-east-1", "eu-west-1"],
});

const users = usersJSON["users"];

for (const user of users) {
  // Create a unique api check for each item in the json file
  new ApiCheck(`api-check-${user.id}`, {
    activated: true,
    frequency: Frequency.EVERY_1H,
    group: apiGroup,
    name: `Users API - ${user.name}`,
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
        AssertionBuilder.jsonBody('$.id').equals(user.id), // fix
        AssertionBuilder.jsonBody('$.name').equals(user.name),
      ],
    },
  })
};
