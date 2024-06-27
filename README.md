# To Do List App for Industrial Internship at HulkApps.

## Project Architecture

The project is organized into two main parts: `client` and `server`.

### Client

The client-side code is located in the `client` directory and is structured as follows:

- **public**: Contains the static files.
  - **images**: Contains all the application's images.
  - `index.html`: The main HTML file for the React app.
  - `manifest.json`: Configuration file for web app metadata and settings.
  
- **src**: Contains the application's source code.
  - **components**: Contains all the application's components.
  - `App.js`: The main application component.
  - `App.css`: Styles for the root component.
  - `index.js`: The entry point for the application.
  - `index.css`: Primary style sheet for the application.
- `package.json`: Lists the dependencies and scripts for the frontend.
- `package-lock.json`:  Dependency management file for npm packages.
- `.gitignore`: Specifies files and directories to be ignored by Git.

### Server

The server-side code is located in the `server` directory and is structured as follows:

- **controllers**: Contains the logic for handling requests and responses.
- **database**: Contains database configuration.
  - **models**: Contains database models.
  - `connectionConfig.js`: Configuration file for database connection settings.
- **routes**: Contains the application's routes.
- **models**: Contains the database models and schemas.
  - `Task.js`: Schema for the task model.
- **services**: Contains application's service logic.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `app.js`: Main entry point for the application.
- `server.js`: The main entry point for the backend server.
- `package.json`: Lists the dependencies and scripts for the backend.
- `package-lock.json`:  Dependency management file for npm packages.

## Getting Started

To get the application running locally, follow these steps:

1. **Install Required Tools:**
   - Install Node.js on your machine.
   - Install MongoDB and start the MongoDB server.
2. **Clone this GitHub repository to your local machine.**
3. **Install Dependencies:**
   - Open a terminal.
   - Navigate to the client directory.
     - Run npm install in the terminal to install all necessary packages for client side. 
   - Navigate to the server directory.
      - Run npm install in the terminal to install all necessary packages for server side.
4. **Configure the Database:**
   - Inside the server directory, create a .env file and add the following lines:
     - ATLAS_URI = mongodb://localhost:27017/my_database (Replace `mongodb://localhost:27017/my_database` with your MongoDB connection URI.)
     - PORT = 5000
5. **Start the Development Server:**
   - In the terminal, navigate to the server directory.
     - Run `npm start` to start the server side.
   - In the terminal, navigate to the client directory.
     - Run `npm start` to start the client side.
6. **View the Application:**
   - Once the server and client side are running, open your web browser and go to `http://localhost:3000` to view the application.  
  
##  Libraries and Dependencies  
  
### Backend (server)
- Express: Web framework for Node.js.
- Mongoose: MongoDB object modeling tool.dotenv: Loads environment variables from a .env file.
- cors: Middleware for enabling Cross-Origin Resource Sharing.  
  
### Frontend (client)
- React: JavaScript library for building user interfaces.  
- axios: Promise-based HTTP client for making requests to the backend.  
- react-router-dom: Declarative routing for React applications.  
- classnames: Utility for conditionally joining class names.  
- @mui/material: React components that implement Google's Material Design.

## Live Demo
[Click here to try the application](https://to-do-list-hulk-apps.netlify.app/)



