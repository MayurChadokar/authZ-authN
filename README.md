# Authentication & Authorization API

This is a RESTful API built using Node.js, MongoDB, and Express. It provides authentication and authorization functionalities, including signup, login, and role-based access. Users can sign up, log in with their email and password, and based on their role (Admin or User), they are directed to the appropriate dashboard.

## Features

- **User Registration**: Allows new users to sign up.
- **User Authentication**: Verify user credentials during login.
- **Role-Based Access Control**: Directs users to different dashboards based on their role (Admin or User).
- **JWT for Secure Sessions**: JSON Web Tokens (JWT) are used for secure session management.
- **Middleware Implementation**: Middleware is used for authorization and user role checks.

## Tech Stack

- **Node.js**: JavaScript runtime.
- **Express**: Node.js framework for building APIs.
- **MongoDB**: NoSQL database.
- **JWT**: For secure token-based authentication.

## Endpoints

### `POST /signup`

- **Description**: Registers a new user.
- **Parameters**:
  - `name` (String): User's name.
  - `email` (String): User's email address.
  - `password` (String): User's password.
  - `role` (String, optional): Role of the user (e.g., "Admin" or "User").
- **Response**:
  - **201 Created**: Successfully registered a new user.
  - **400 Bad Request**: User already exists or invalid input.

### `POST /login`

- **Description**: Authenticates a user and generates a JWT.
- **Parameters**:
  - `email` (String): User's email address.
  - `password` (String): User's password.
- **Response**:
  - **200 OK**: Successful login with a JWT and role information.
  - **401 Unauthorized**: Invalid credentials.
- **Role-Based Redirection**:
  - If the user is an **Admin**, they are directed to the Admin Dashboard.
  - If the user is a **User**, they are directed to the User Dashboard.

## Middleware

- **JWT Middleware**: Used to verify the JWT for each request.
- **Role Middleware**: Ensures users have the appropriate access level for certain endpoints.

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/authZ-authN.git
   cd your-repo-name
   npm install
    ```
2. **Start The Server**

    ```bash
        npm start
    ```

**Access the API: The API will be available at http://localhost:4000**

## Usage
1. Sign Up: Send a POST request to /signup with name, email, password, and optionally, role.
2. Login: Send a POST request to /login with email and password.
3. Access Role-Based Content: Based on the user's role, access to specific resources is provided.

## License
This project is licensed under the MIT License.
