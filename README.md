# sfdc-tasks
React app for displaying tasks in SFDC

## Scripts

This is a WIP

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
