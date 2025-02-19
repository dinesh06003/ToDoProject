# To-Do Task Project

## Overview
This is a to-do task management application that allows users to add, delete, edit, search for tasks and filter task by due date. The application has a frontend built with React and a backend built with Spring Boot.

## Tools Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: A promise-based HTTP client for making API requests.

### Backend
- **Spring Boot**: A framework for building Java-based web applications.
- **Spring Data JPA**: For data persistence and database interactions.
- **PostgreSQL**: A powerful, open-source relational database for storing application data.
- **Maven**: A build automation tool for managing project dependencies.

## Installation

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd todofrontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Backend
1. Navigate to the backend directory:
   ```bash
   cd todobackend
   ```
2. Install dependencies (if using Maven):
   ```bash
   mvn install
   ```

## Running the Application

### Backend
1. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will typically run on `http://localhost:8080`.

### Frontend
1. Start the React application:
   ```bash
   npm start
   ```
   The frontend will typically run on `http://localhost:3000`.
## Output
![app screenshot](/todofrontend/src/assets/Preview.png)
## Usage
- Access the application in your web browser at `http://localhost:3000`.
- Use the interface to add, delete, edit, and search for tasks.

## Contributing
Feel free to fork the repository and submit pull requests for improvements or features.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
