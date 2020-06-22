#

You can write the description for the module in here

## How to start

This project uses `node` version `12`.

We recomend using `nvm` to select `node` version we are using.

- If you dont have it installed yet, you can do it here: https://github.com/nvm-sh/nvm#installing-and-updating .

1.  Run in your terminal `nvm use`.
2.  Then run `npm install`.
3.  And then you can start the app with `npm run start`.

## To run the unit tests

Before you run it you have to check if you are using node version 12.
You can do it by running `nvm version`.

Then you can execute the tests:

1.  Go to you terminal
2.  Run `npm run test`.

If you need to update snapshots you can do it by running `npm run test -- -u`

> Everytime the test execution finishes succesfully we are going to generate a `coverage` folder. In order to see the coverage you can go to `coverage/lcov-report/index.html` and open it in the browser.

## To run the integration tests

To execute the integration tests follow these steps:

1.  Go to you terminal
2.  Run `npm run start-test`.
3.  Run `npm run cypress:open`.

Then a browser is going to pop up and start executing the tests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000/](http://localhost:3000/) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run cypress:open`

Opens the cypress test runner.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Folder structure

```sh
REACT-SKELETON/
    README.md
    node_modules/
    package.json
    public/
        index.html
        favicon.ico
    src/
        App.css
        App.js
        App.test.js
        index.css
        index.js
        config/
            default.js
            development.js
            index..js
            production.js
            test.js
        services/
            visitation.js
        utils/
            date.js
```

### Description

- **`public/`**
  - **`index.html`** is the page template. For the project to build, this file must exist with exact filename.
- **`src/`**

  - **`index.js`** is the JavaScript entry point. For the project to build, this file must exist with exact filename.
  - **`config/`** folder contains a file for each environment, where each file contains variables specific for that environment.

    - `default` file contains default variables across every environment.
    - `development` file contains development environment variables.
    - `production` file contains production environment variables.
    - `test` file contains test environment variables.

  - **`services/`** folder contains api services.
  - **`utils/`** folder contains utility functions.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
