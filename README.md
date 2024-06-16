# To Do List App (version 2) for Industrial Internship at HulkApps.

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

1. **Install Required Tools:**:
   ▪︎ Install Node.js on your machine.  
   ▪︎ Install MongoDB and start the MongoDB server.  

