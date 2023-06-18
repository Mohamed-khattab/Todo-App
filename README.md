# React Native TodoApp

The React  TodoApp is a  application for managing a todo list. It includes a backend API built with Express.js, a frontend app developed using React js, and a database for storing the todo data.

## Features

- User authentication with JWT-based authentication system
- Create, read, update, and delete todos
- Secure password storage using bcrypt
- Support for SQL and NoSQL databases through Prisma.js

## Technologies Used

- React js
- Express.js
- Prisma.js
- MySQL or MongoDB (Choose either as per your preference)
- bcrypt
- JSON Web Tokens (JWT)

### Prerequisites

- Node.js (v14 or higher)
- Database (MySQL or MongoDB)

#  TodoApp API

This API provides endpoints for managing todos in the React Native TodoApp.

## Authentication

### POST /api/auth/register

Register a new user.

#### Request Body

  ```json
  {
    "username": "example_user",
    "password": "example_password"
  }
  ```
#### Response code : 

- **200 OK**: List of todos
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**

###  POST /api/auth/login

Authenticate a user and generate a JWT token.
Request Body

  ```json

  {
    "username": "example_user",
    "password": "example_password"
  }
  ```
Response code

- **200 OK**: List of todos
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**

## Todos

### GET /api/todos

Retrieve all todos.

#### Response

- **200 OK**: List of todos
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**

### POST /api/todos/create

Create a new todo.

#### Request Body

  ```json
  {
    "title": "Example todo",
    "description": "Example description"
  }
  ```
Response

   
- **200 OK**: List of todos
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**
- 
### DELETE /api/todos/:id

Delete a todo by ID.
Parameters

    id: ID of the todo to delete

#### Response

- **200 OK**: List of todos
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**


### PUT /api/todos/update/:id

Update a todo by ID.
Parameters
  ```
      id: ID of the todo to update
  ```
  #### Request Body

   ```json

  {
    "title": "Updated todo",
    "description": "Updated description"
  }
  ```
#### Response


- **200 OK**: List of todos
- **401 Unauthorized**: Missing or invalid token
- **500 Internal Server Error**


### installation 

### Backend

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-repository.git
   ```
2. Navigate to the backend directory:
  ```
  cd your-repository/backend
  ```
3. Install the dependencies:

  ```
  npm install
  ```
4. Configure the environment variables:

    Create a .env file in the backend directory.
    Add the required environment variables and their values to the .env file. (Provide instructions on which environment variables need to be set and their purpose)

5. Start the backend server:

  ```
  npm start
  ```
The backend server will be running at `http://localhost:3000` .



### Frontend

1. Navigate to the frontend directory:
```
cd your-repository/frontend
```
2. Install the dependencies:
```
npm install
```
3. Start the frontend development server:


```
npm start
```

The frontend development server will be running at `http://localhost:3000` .
