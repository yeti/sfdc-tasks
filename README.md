# sfdc-tasks
React app for displaying tasks in SFDC.

## Overview

This [React](https://facebook.github.io/react/) application uses [JSForce](https://jsforce.github.io/) to interface with Salesforce. It uses [Redux](http://redux.js.org/) for its state management and [Webpack](https://webpack.github.io/) as a bundler (Gosh, this is so 2016 😔). It implements the [Lightning Design System](https://www.lightningdesignsystem.com/) for the front-end.

## Authentication

JSForce is a powerful Javascript library that allows, amongst other things, authenticating with Salesforce, querying its database, and performing CRUD operations against its records.

JSForce's [authentication](https://jsforce.github.io/document/#connection) capabilities allow us to connect to Salesforce in different ways:

    * With a username/password combination when outside of Salesforce
    * With a Session ID when within Salesforce

During development, the first method is preferred as it is much faster; it allows us to run the project locally and have Webpack hot-reload our changes without the need to redeploy each time. A pitfall of this approach, however, is it requires credentials to be loaded into the app, making dev builds unsuitable for production.

When we bundle the app for production, we generate a dummy Visualforce page that loads in the app's Static Resource and exposes the current Session Id which allows us to authenticate. For you normies, this is a blank webpage that loads in the javascript bundle from Salesforce's CDN and attaches your API auth token the `window` object. This removes the need to use credentials as it instead relies on the Session Id.

To juggle between these two modes 🤹🏻, we were kind enough to supply different Webpack builds that handle these two scenarios:
    * The "dev" build loads in your username/password as environment variables and sets up hot-reload.
    * The "salesforce" build does not bundle your credentials as environment vars. It zips up all your assets (ie compiled React app) into a Static Resource (A resource bundle is just a `.zip` file with the extension changed to `.resource`, obviously) and generates a templated Visualforce page which loads in the application and supplies the Session Id auth token.

## Getting Started

### Environment Variables

### Running Locally

### Running on the Salesforce platform

### Deploying to production



## Scripts

This project can be run locally, or deployed to a Salesforce Dev/Sandbox org.

### Dev

**npm run start**: Run the webpack-dev-server with hot-reloading. Uses src/index.jsx as the entry point. Webserver launches at https://localhost:8080.


### Build

**npm run build**: Production build.

**npm run build:salesforce**: Build a VF page containing app and package the zip. I.e. Get everything ready for deployment.

### Deploy

Make sure to have an .env file with the following vars:

```env
SF_USERNAME=<SFDC Username>
SF_PASSWORD=<Password><Security Token>
SF_URL=<Login Url (eg. https://test.salesforce.com for sandbox, https://login.salesforce.com for dev/prod)>
```

After having built your app, run `nf run npm run deploy`. (Probably want to move this into webpack somehow?)

This will deploy the mock Visualforce page containing your app, and the Static Resource containing the bundled React App
