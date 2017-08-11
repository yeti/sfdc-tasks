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
  * The "salesforce" build does not bundle your credentials as environment vars but instead relies on the app being opened in an environment where an auth token is exposed. It zips up all your assets (ie compiled React app) into a Static Resource (A resource bundle is just a `.zip` file with the extension changed to `.resource`, obviously) and generates a templated Visualforce page which will load in the application and supply the Session Id auth token.

## Getting Started

To set this up on your machine, make sure you've got Nodejs/npm installed and follow the steps below.

### Node

This project is stable on Nodejs v8.1.2 as specified in the `.nvmrc` file. Make sure you are using the correct version by running in your terminal:

```bash
nvm use
```

### Environment Variables

Some environment variables are necessary for the project to build. Create a `.env` file and paste the contents of `.env-example` into it. You will then want to fill it out with the right data.

### Running Locally

To kick off the dev server, run this in your terminal:

```bash
npm start
```

This will open the app on `https://localhost:8080/`.

### Running on the SFDC platform

To deploy the app, run this in your terminal:

```bash
npm run deploy
```

This will run a production build and deploy it to your SFDC sandbox/dev org. Once deployed, the app will be available at `<salesforce root url>/apex/<visualforce page name>` - i.e. https://c.cs17.visual.force.com/apex/TaskTracker

### Deploying to production

SFDC doesn't let you deploy straight to production. Instead, you have to deploy to a sandbox, and deploy to production from there via an outbound changeset:

  * Create outbound changeset in sandbox
  * Add components (resource bundle, visualforce page)
  * Upload changeset
  * Open list of inbound changesets in production
  * Install
