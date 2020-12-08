# Group 203_7 for CSCI 3308 in Fall 2020 at CU Boulder
## Project Team Members:

- Matthew Teta
- Brian Mayers
- Samuel Mast
- Charlie Koepke
- Rebecca Coryell
- Lakshya Jaishankar
- Sarah Zendle

## Application Name: envi

## Application Description:
envi is a website designed to help individuals monitor their environmental impact. Users have their own profile page where they may change their profile picture, information such as their username or name, as well as view their impact points and achievements. Users can track many actions, including using reusable water bottles and cups, avoiding disposable straws, and biking or walking rather than driving. As users continue to track their progress on the tracking page, the impact points they earn are reflected with a water bottle graphic on the tracking page and on the profile page. After reaching different amounts of impact points, users are awarded with achievements. 
In addition to tracking a user’s individual accomplishments, users may follow their friends to see their achievements. This fosters a friendly and competitive social platform for environmentally conscious people to share their positive impacts with their community. In order to provide more knowledge about the importance of saving our planet, envi also offers the option for users to visit the websites of companies and organizations dedicated to protecting the environment as well as donate to their causes.


## Vision Statement:
For environmentally conscious people who would like to track and share the positive impacts they’re making, envi is a social platform where users can build a communal sense of environmental accountability that unites us during these troubling times.

Development Method: agile

Communication Plan: We will have two meetings a week over Zoom and communicate as we work over a Slack channel. Standup meetings once a week with our TA will keep us up to date on how each individual team member’s work is going.

Meeting Plan: Tuesday at 7:15pm and Wednesday at 6:45pm(Zoom)

## How to Run the Code:
After cloning the repo into a coding environment of your choice, navigate to the envi-api folder where you can run the application locally by saying "npm run start:dev" on the command line. Then go to the browser and type "localhost:5000". This will take you to envi's home page.



# Proposed Architecture Plan:

- Backend Database: PostgreSQL
- Integration Layer:
  - Node.js
   Node-postgres
  - Express.js
    - Used to define endpoints for a REST api
  - Jsonwebtoken
    - For user authentication similar to this tutorial
- Frontend UI:
  - The frontend will communicate with the backend through HTTPS calls to the REST api
  - HTML
  - Bootstrap CSS and custom CSS
  - JS
  - React
    - create-react-app boilerplate
  - SVG.js
  - Used for graphics and rendering “islands” on user profiles


