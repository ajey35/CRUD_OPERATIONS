# Student Management System

This project is a Node.js application that uses Express.js for routing, MySQL for database operations, and EJS as the templating engine to render HTML views. The app allows CRUD (Create, Read, Update, Delete) operations on a students database table. Here's a breakdown of the main components and their functionalities:

## 1. Dependencies:
- **express**: A web framework for building Node.js applications.
- **mysql**: A MySQL client for interacting with the MySQL database.
- **path**: Node.js module for working with file paths.
- **body-parser**: Middleware to parse incoming request bodies (JSON and URL-encoded data).
- **ejs**: Templating engine to generate dynamic HTML pages.

## 2. MySQL Connection:
The app creates a MySQL connection pool to manage database queries more efficiently. The credentials include:
- **host**: Localhost (assuming a local MySQL database).
- **user**: root user with a password (" ").
- **database**: The name of the database is `exam`.

## 3. Routes and Their Functionalities:
### a. GET '/' (Root Route):
Sends the user the `index.html` file from the server, which is likely a form for entering student data.

### b. POST '/' (Insert Student):
Receives form data (id, name, email, phone) and inserts it into the students table. After successful insertion, the user is redirected to `/display`, where all students' data is shown.

### c. GET '/display' (Display Students):
Retrieves all students from the students table and displays them using the `data.ejs` view file.

### d. GET '/delete-students' (Delete Student):
Deletes a student from the students table based on the provided id (through query parameters). After deletion, the user is redirected back to `/display`.

### e. GET '/update-students' (Update Student - Fetch Data):
Fetches the student data for a given id and displays it in an update form using the `update.ejs` file.

### f. POST '/update-students' (Update Student - Submit Update):
Updates the student information (name, email, phone) for a given id in the students table.

### g. GET '/search-student' (Search Interface):
Renders a search form to search for students in the students table.

### h. GET '/search' (Search for Students):
Searches for students in the students table using name, email, or phone. It performs a SQL query using wildcards (LIKE) to find matching students.

## 4. App Setup:
The server listens on port 5000. If there’s an error during the server startup, it will throw an error; otherwise, it will log that the server is successfully running.

## Summary:
This project is a simple web application that interacts with a MySQL database to perform CRUD operations on student data. It uses Express.js for routing, MySQL for database management, body-parser for parsing form data, and EJS for rendering views. The application allows users to add, update, delete, search, and display student records.
