# [envi](https://envi-app.herokuapp.com/home/)

## Requirements

- [PostgreSQL](https://www.postgresql.org/download/)
- [node.js](https://nodejs.org/en/)

## Installation

After installing the requirements above, run the following commands to get up and runnning

```sh
# Clone the repository and move to the node project directory
git clone https://github.com/CSCI-3308-CU-Boulder/203_7_F20.git
cd 203_7_F20/envi-api

# Create a new PostgreSQL User
psql -U postgres postgres -c "CREATE USER envi_api_user WITH PASSWORD 'password';"
# Be sure to change the password above ^^
psql -U postgres postgres -c "CREATE DATABASE envi WITH OWNER envi_api_user;"
# Create database from script
psql -U postgres postgres -c "\i database/database2.sql"

# Install packages
npm i

# Run development server
npm run start:dev

# or build and run productions
npm i -g rimraf
npm run build
npm run start
```

## Contributors

- Matthew Teta
- Brian Mayers
- Samuel Mast
- Charlie Koepke
- Rebecca Coryell
- Lakshya Jaishankar
- Sarah Zendle

## Application Description

envi is a website designed to help individuals monitor their environmental impact. Users have their own profile page where they may change their profile picture, information such as their username or name, as well as view their impact points and achievements. Users can track many actions, including using reusable water bottles and cups, avoiding disposable straws, and biking or walking rather than driving. As users continue to track their progress on the tracking page, the impact points they earn are reflected with a water bottle graphic on the tracking page and on the profile page. After reaching different amounts of impact points, users are awarded with achievements. 

In addition to tracking a user’s individual accomplishments, users may follow their friends to see their achievements. This fosters a friendly and competitive social platform for environmentally conscious people to share their positive impacts with their community. In order to provide more knowledge about the importance of saving our planet, envi also offers the option for users to visit the websites of companies and organizations dedicated to protecting the environment as well as donate to their causes.

## Vision

For environmentally conscious people who would like to track and share the positive impacts they’re making, envi is a social platform where users can build a communal sense of environmental accountability that unites us during these troubling times.

## Development Method

- Agile using Jira
  - [See Jira Backlog Here](https://envi-203-7-csci3308.atlassian.net/jira/software/projects/EC/boards/1/backlog)

## Communication Plan

We will have two meetings a week over Zoom and communicate as we work over a Slack channel. Standup meetings once a week with our TA will keep us up to date on how each individual team member’s work is going.

## Meeting Plan

Tuesday at 7:15pm and Wednesday at 6:45pm using Zoom

## Architecture

- Database
  - PostgreSQL
- Integration Layer (Backend):
  - [node.js](https://nodejs.org/en/)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [express](https://www.npmjs.com/package/express)
  - [express-promise-router](https://www.npmjs.com/package/express-promise-router)
  - [express-session](https://www.npmjs.com/package/express-session)
  - [passport](https://www.npmjs.com/package/passport)
  - [passport-local](https://www.npmjs.com/package/passport-local)
  - [pg](https://www.npmjs.com/package/pg)
- Frontend:
  - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
  - [Bootstrap](https://getbootstrap.com/)
  - [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - [JQuery](https://www.npmjs.com/package/jquery)
  - [Axios](https://www.npmjs.com/package/axios)
  - [Google Charts](https://developers.google.com/chart/interactive/docs/gallery/piechart)

## Testing

### User Acceptance Tests Cases

- Signup Page
  - A user inputs an invalid username
    - The ```/api/signup/``` route funtion will check to make sure that all of the characters used in the name are valid and the username is unique. The UNIQUE key is used in the SQL schema.
    - As a backup, the ```/api/validateUsername``` route is available to check the validity of the username prior to the username hitting the submit button.
  - When the user uses an invalid password
    - The ```/api/signup/``` will check to see if all the characters in the password are valid before encrypting it and inserting it into the database. If the password is not then the user will be notified about the issue and the signup will be rejected. 
  - If one of the required fields is not filled
    - When a user clicks the submit button, the “required” tag in the form will not allow the user to submit the form without filling out all of the required fields.
  - If the user has not checked the terms and conditions agreement checkbox
    - When a user clicks the submit button and the checkbox is not checked, they will be notified that they need to read the Terms & Conditions.
  - If the password and the confirm password fields do not match
    - The ```/api/signup/``` route funtion will check if the passwords match. If the passwords don't match then the user cannot complete the sign-up process.
- Login Page
  - When a user’s login information is correct
    - The browser will be sent a login token, and the user will be redirected to the tracking page.
  - If the user’s username/email is incorrect
    - When the user hits the login button, the username inputted will be checked against the usernames stored in the database. The user will have to try different usernames until every character matches the characters in the database.
    - As a convienience, the username/email should not be case sensitive.
  - If the user’s password is incorrect
    - When the user hits the login button, the password inputted will be encrypted and then checked against the encrypted password stored in the database for the username/email given. The user will have to try different passwords until every character matches the characters in the database.
    - The passwords are case sensitive.
- User Profile Page
  - A user changes their username
    - If the username they choose is taken, the user should be notified of the issue, and the username should not be updated. The user should be unable to submit the form.
    - If the username they choose is not already taken, the username should be updated in the database.
  - A user changes their password
    - The new password will not submit to the database until the old password is entered correctly and the new password matches criteria (length, contains a number, etc.)
    - If everything is valid, the password will be encrypted and updated in the database.
  - A user updates any other information
    - The data should be updated to the database and the frontend should update to reflect the changes.

## Version

- FinalSubmission
