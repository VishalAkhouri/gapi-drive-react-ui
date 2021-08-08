# Google Drive  - React UI

This project uses ReactJS and Google Drive’s APIs to authenticate and list files hosted on Google Drive. The users are authenticated via OAuth. 
Following are all the framework and technologies used:
* [NextJS](https://nextjs.org/) - React Framework
* Google API Javascript client - [GAPI](https://github.com/google/google-api-javascript-client)
* Typescript
* SCSS/SASS - CSS Preprocessor
* [Material UI](https://material-ui.com/) - Material Design based React Components
* Unit testing - Jest, Enzyme, React Testing Library
* End to End testing - Cypress

## Demo

![Demo](public/demo.gif)

## SetUp - Google Project, Enable Drive API, OAuth Client Id

* Login to https://console.cloud.google.com/
* Select / create a project and enable Drive API for the Project (refer https://developers.google.com/drive/api/v3/enable-drive-api)
* Create 'OAuth Client Id', choose application type as 'Web Application' (refer https://developers.google.com/drive/api/v3/about-auth)
  * Note down the 'Client ID' and 'Client secret' generated
  * For runnning the application locally - specify Authorised Javascript Origin 'http://localhost:3000'
  * For runnning the application locally - specify Authorised redirect URIs 'http://localhost:3000'
* Generate an API key and keep that handy
* Create an 'OAUTH Consent Screen', with these specific details
  * User Type - External
  * Test Users - Add your gmail id which you will use on Google's OAUTH login screen

## SetUp - Application for the first run

* Update the `next.config.js` in the project with the values generarated in the above steps

```
module.exports = {
    env: {
        CLIENT_ID: '<Insert client id here>',
        REDIRECT_URL: 'http://localhost:3000',
        API_KEY: '<Insert API key here>'
    },
}
```
* Start the dev server - `npm run dev`

## Testing

* Run End to End testing (in CI/CD or using command prompt/terminal) - `npm run cypress:run`
* Run end to End testing (Interactively) - `cypress:open`, and click specific script to run (need to start the server at http://localhost:3000 first)
* Run Unit test - `npm run test` (there are some pending setup issues that needs to be fixed - refer details below pending items section)

## Debugging some issues

*Issue 1:*
```
details: "Cookies are not enabled in current environment."
error: "idpiframe_initialization_failed"

```
*Fix:* Enable Cookies and switch off private / incognito mode

*Issue 2:*
```
err = {error: "popup_closed_by_user"}

```
*Fix:* In Chrome: Settings → Advanced → Clear browsing data → Cached images and files. Also might needs to clear Cookies.

*Issue 3:*
```
User not allowed in testing mode on OAuth screen

```
*Fix:* Add test user from Google Cloud - OAuth consent screen.

*Issue 4:*
```
OAuth screen does not popup once a user is authenticated

```
*Fix:* Clear cookies and try again.

## Pending items to be addressed

There are these pending items with the project that needs to be fixed
* Unit test has issues with Jest + Enzyme + Typescript setup

## References

* https://console.cloud.google.com/
* https://developers.google.com/drive/api/v3/about-sdk
* https://developers.google.com/drive/api/v3/about-auth
* https://developers.google.com/identity/protocols/oauth2
* https://github.com/google/google-api-javascript-client
* https://nextjs.org/
* https://material-ui.com/
