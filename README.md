# Checkly Support Engineer Challenge

Initializes a specialized Checkly environment as requested by [Checkly Customer].

## Features
- Provides a structured project where Playwright tests living in the `playwright-tests` directory are automatically deployed as Browser Checks by Checkly CLI
- Automatically reads additional API Checks from the `users-api.json` file and sets them to be deployed by Checkly CLI
- Separates the two items above into 2 different Check Groups, each alerting the `raccoon@checklyhq.com` email on any test failure

## Prerequisites
Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/en) (v22.13 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/samduwu/se-challenge.git
   ```
2. Navigate to the project folder:
   ```bash
   cd se-challenge
   ```
3. Install dependencies (Checkly) in your local environment:
   ```bash
   npm install
   ```
4. Verify Checkly was installed properly:
   ```bash
   npm checkly --version
   > checkly/10.2.0 ...
   ```

## Setup
Before Checkly operations can be run on the cloud, you'll need to login to your Checkly account.
1. Login (Or create an account) via:
   ```bash
   npx checkly login
   ```
  Running this command will redirect you to your browser where you can authenticate with your username and password.

  ***Please verify the code in your browser is identical to the one in your terminal before proceeding.***

2. For this specific use case, some the api tests will fail since they require a sensitive auth token to be passed in the header of the request. Add your AUTH_TOKEN to the environment variables via:
   ```bash
   npx checkly env add AUTH_TOKEN "your_token_here" --secret
   ```
  The `--secret` flag is intended for sensitive data and will encrypt your token. The actual value of the token will never be displayed in the CLI or the Web UI.

  The following commands can also be used to manage your environment variables:
   ```bash
   npx checkly env ls                                              # list all environment variables (EV)
   npx checkly env update "token_name" "your_token_here" --secret  # update an existing EV
   npx checkly env rm "token_name"                                 # delete an existing EV
   ```

## Usage
1. To test all your checks with Checkly:
   ```bash
   npx checkly test
   ```
  This will show you a summary of the test results, and any errors that may have occurred. We recommend verifying your tests pass with this command before proceeding with deployment.

2. Once you are satisfied with the results, deploy the scheduled monitoring via:
Run the application locally:
   ```bash
   npx checkly deploy --schedule-on-deploy
   ```

The `--schedule-on-deploy` flag will run the tests right after deployment. Otherwise they are set to run every hour. The flag can be omitted if you do not need to run the tests immediately.

To see the current status of your tests:
   ```bash
   npx checkly checks list
   ```

## Additional Notes and Resources
* The `__checks__` folder is where Checkly (by default) will look for checks to deploy.
  * `api.check.ts` will automatically generate API Checks based on the `users-api.json` file. The JSON file can be extended with more users without changing this check file.
  * `playwright.check.ts` will automatically Browser Checks based on the tests in the `playwright-tests` directory. Similar to before, more tests can be added without changing the check file.
* `alert-channels.ts` defines the email channel that is being alerted for potential failures.
* `checkly.config.ts` is the Checkly config file.
  * Note: Here is where we are specifying which channel to alert on test failure. For more modularity, the `alert` key in the config object can be added to the Check Groups defined in the `__checks__` folder to change which email is alerted, how many alerts should be sent, and so on.

 For more general information on the Checkly CLI, please visit our [documentation](https://www.checklyhq.com/docs/cli/overview/).

## Notes
- Submission for Samuel Wu
