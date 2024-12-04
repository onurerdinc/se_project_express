# WTWR (What to Wear?): Back End

This project represents the backend of the WTWR application, built using Node.js, Express, and MongoDB. It features robust routing and controller logic to handle fetching, creating, and deleting items for the frontend. The backend also incorporates secure user authentication and data storage, enabling users to create and manage their accounts safely. All API endpoints were rigorously tested with Postman to ensure functionality, accuracy, and performance.
## Functionality

- **User Management**:

  - Retrieve a list of all users.
  - Retrieve user details by user ID.
  - Create a new user profile.

- **Clothing Item Management**: Users can:
  - Create, read, and delete clothing items.
  - Like or unlike clothing items based on user preferences.

## Technologies and Techniques Used

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web application framework for Node.js, used to handle routing and middleware.
- **MongoDB**: NoSQL database for storing user data and clothing information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js, used to model the application data.
- **Nodemon**: Tool for automatically restarting the server during development.

## Hosting

The application is deployed and hosted using **Google Cloud Platform (GCP)**. This ensures reliability, scalability, and easy access for end-users.  

## Domains

The following domains are used for this project:

- [api.wtwr.wooloo.net](https://api.wtwr.wooloo.net)
- [wtwr.wooloo.net](https://wtwr.wooloo.net)
- [www.wtwr.wooloo.net](https://www.wtwr.wooloo.net)


## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

