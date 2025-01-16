# WeWire Take Home
This project is a full-stack application built with **Next.js** for the frontend and **NestJS** for the backend. It allows users to convert currencies and keep track of them.

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js
- Yarn
- Docker (optional)
- PostgreSQL (optional, if you want to use the docker container)

## Getting Started

### 1. Clone the Repository

### 2. Pre-installation
Run
```bash
chmod +x start-dev.sh && chmod +x install-dependencies.sh
```
to make shell scripts executable for the next steps. 

### 3. Install Dependencies
Run the following command to install dependencies for both the web and API:

```bash
./install-dependencies.sh 
```


### 4. Setup Environment Variables
Inside the `api` folder, create a `.env` file using `.env.example` as a guide:

### 5. Setup Database

```bash
cd api/ && docker-compose up -d
```

This will start a PostgreSQL container with the necessary database and user.

If you encounter a `"role 'your_username' does not exist"` error, create the database manually using the credentials in the `.env` file. [See here for guide](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e).

### 5. Start the Development Servers

```bash
./start-dev.sh
```

This will start the frontend and the backend. 
**Note:** Make sure you run this in the root as the previous command changes directory.

###  Access the Application
Open your browser and navigate to `http://localhost:3000` to access the web application.

- Login credentials are the same credentials set in env as, this user is seeded automatically on startup.
`INITIAL_USER_EMAIL and INITIAL_USER_PASSWORD`

###  API Documentation
The API documentation is available at `http://localhost:4000/api`.


###  Testing (api)
To run the tests, use the following command(s):

suites: 
```bash
yarn test 
```
coverage: 
```bash
yarn test:cov
```

end-to-end: 
```bash
yarn test:e2e
```
###  Logs
`api/logs`


## Features
- Currency conversion functionality
- User authentication
- Responsive design
- Transaction history


## Known issues
- Shell script for starting apps does not handle errors, this means if one app crashes on startup the other will still be binded on the port so make sure to kill the process on that port before running again. 

**case:** if api env is not set up properly, the backend will crash and the ui will occupy localhost 3000, on the next run 3001. This will lead to CORS errors from the api so make sure to have the port available. 