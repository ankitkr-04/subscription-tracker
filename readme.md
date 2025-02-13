# Subscription Tracker

## Overview
Subscription Tracker is an Express.js based backend project that helps manage user subscriptions and sends reminder emails before the subscription renewal date. It uses various technologies including Nodemailer for sending emails, Arcjet for middleware, Upstash for workflow management, and JWT for authentication.

## Features
- User authentication using JWT
- Subscription management
- Automated email reminders for subscription renewals
- Middleware integration with Arcjet
- Workflow management with Upstash

## Technologies Used
- **Express.js**: Web framework for Node.js
- **Nodemailer**: Module for Node.js applications to send emails
- **Arcjet**: Middleware for enhanced request handling
- **Upstash**: Serverless data platform for workflow management
- **JWT**: JSON Web Tokens for secure authentication
- **Mongoose**: MongoDB object modeling for Node.js

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ankitkr-04/subscription-tracker.git
    cd subscription-tracker
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    #ENVIRONMENT
    NODE_ENV=<development|production>
    SERVER_URL="""
    PORT="<port no>"
    DB_URI=""
    JWT_SECRET=""
    JWT_EXPIRES_IN="<in days>"
    ARCJET_KEY="""
    ARCJET_ENV=""
    QSTASH_URL=""
    QSTASH_TOKEN="
    EMAIL_PASSWORD=""
    ```

## Usage
1. Start the server:
    ```bash
    npm start
    ```

2. For development mode with hot-reloading:
    ```bash
    npm run dev
    ```

3. Access the API at `http://localhost:3000`

## API Endpoints
- `POST /api/v1/auth/login`: User login
- `POST /api/v1/auth/register`: User registration
- `GET /api/v1/users`: Get user details
- `POST /api/v1/subscriptions`: Create a new subscription
- `GET /api/v1/subscriptions`: Get all subscriptions
- `POST /api/v1/workflows/send-reminders`: Trigger reminder workflow

## License
This project is licensed under the MIT License.