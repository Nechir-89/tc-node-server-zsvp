# Node.js and Express REST API with TypeScript

This is a REST API built with Node.js, Express, and TypeScript, connected to a PostgreSQL database. It uses a three-layer architecture (Router, Controller, and Services) and includes APIs for user management and authentication.

## Features

-   User registration and login
-   CRUD operations for users
-   Protected routes using JWT
-   File uploads for authenticated users
-   CORS enabled

## Prerequisites

-   Node.js
-   npm
-   PostgreSQL

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

    -   Install PostgreSQL if you haven't already.
    -   Open a PostgreSQL terminal and run the following commands to create a new database and user:

        ```sql
        CREATE DATABASE mydatabase;
        CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';
        GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
        ```

    -   Connect to the new database:

        ```bash
        psql -U myuser -d mydatabase
        ```

    -   Run the `init.sql` script to create the `users` table:

        ```bash
        \i db/init.sql
        ```

4.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables:

    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=mydatabase
    DB_USER=myuser
    DB_PASSWORD=mypassword
    JWT_SECRET=your_jwt_secret
    ```

5.  **Run the application:**

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:3000`.

## API Endpoints

### Auth

-   `POST /auth/login`: Login a user and get a JWT token.

### Users

-   `GET /users`: Get all users.
-   `GET /users/:id`: Get a user by ID.
-   `POST /users`: Create a new user (requires authentication).
-   `PUT /users/:id`: Update a user (requires authentication).
-   `DELETE /users/:id`: Delete a user (requires authentication).
-   `POST /users/upload`: Upload a file (requires authentication).

## File Uploads

To upload a file, send a `POST` request to `/users/upload` with a `form-data` body containing a `file` field. The user must be authenticated.
