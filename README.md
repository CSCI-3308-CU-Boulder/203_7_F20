# Group 203_7 for CSCI 3308 in Fall 2020 at CU Boulder
## Members:


## Application Name: envi

## Application Description:
Track things you do to help the environment
Reusable water bottles/cups
Reusable Straws
Donate clothes
Reusable shopping bag
Biking/walking rather than driving
Allows users to share their positive impacts with friends
Earn rewards to create a “biome” - you can build it up as you do more
Corporate carbon footprint tracker?

## Vision Statement:
For environmentally conscious people who would like to track and share the positive impacts they’re making, envi is a social platform where users can build a communal sense of environmental accountability that unites us during these troubling times.

Development Method: agile

Communication Plan: We will have two meetings a week over Zoom and communicate as we work over a Slack channel. Standup meetings once a week with our TA will keep us up to date on how each individual team member’s work is going.

Meeting Plan: Tuesday at 7:15pm and Wednesday at 6:45pm(Zoom)



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


