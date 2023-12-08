# Mini-Project-9
This branch is for mini-project-9. To run, clone, make sure all dependancies are installed on your computer and cd to mini-project-backend and frontend and run both through and npm run start and nodemon index.js.

Required installation:
- Node.js
- Express
- Nodemon
- Method Override
- Ejs
- React
- MongoDB
- Mongoose
- Cors
- Bcrypt.js
- Passport and Passport Local

## Update Functionality
Too many new features so it'll categorized below
Passport
- Added new passport features for logging in, out, and registering
- Have front end check whether user was logged in or not through conditional rendering
- Have new mongoose schema that stores new registered users with passwords hashed through bcrypt 

Back to front cloud
- Backend now can interact with frontend
- Both backend and frontend are uploaded to cloud(render and vercel)

Frontend
- All views have been deleted
- Frontend pages have been implemented for each page of the deleted view
- Used Routes to navigate through frontend easier
- Added layout that will always be there no matter which page you are on
- Used fetch with useState and useEffect to grab backend api
- Modified forms to interact with backend

Backend
- New get requests to respond to fetch requests from the front
- Deleted requests that are no longer need, instead modifying needed requests that interact with frontend

Other
- Added env file that holds sensitive data
- Modified packages to support back to front support

## Current Bugs
None

## Fixed Bugs
- Fixed bug where description wasn't showing up due to description having a typo

## How to Run
1. Make sure to have the required installations set up
2. Run git bash at the backend directory and frontenddirectory
3. Type nodemon index.js and npm run start in bash

# Badges
<a href="https://codeclimate.com/github/LooseEndedPal/Modern-Web-Technologies-Archive/maintainability"><img src="https://api.codeclimate.com/v1/badges/7423b9e695feed0888a7/maintainability" /></a>
