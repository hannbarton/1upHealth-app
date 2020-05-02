[Deployed app](https://oneuphealth-app.herokuapp.com/)

This project was created using my own [boilerplate](https://github.com/hannbarton/boiler) repo

1.) `npm install`

2.) Start by filling out the following environment variables in your secrets.js file
- process.env.CLIENT_ID = '';
- process.env.CLIENT_SECRET = '';
- process.env.BASE_URL = 'https://api.1up.health';

3.) Manually create a user at 1upHealth:
{
    curl -X POST "https://api.1up.health/user-management/v1/user/auth-code"
    -d "client_id=clientidclientidclientid"
    -d "client_secret=clientsecretclientsecret"
    -d "app_user_id=myappsuserid"
}


4.) Create a postgresql database called `health` in your local postgresql database (port 5432)
5.) `npm start`
6.) http://localhost:3000
7.) login using your 1upHealth created user in step 3. For testing purposes, `hannbarton` is a valid username you can use to login
8.) After oauth2, you will be navigated to `/home`. You must create a patient before querying for patient data.
