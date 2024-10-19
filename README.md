# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

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

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
