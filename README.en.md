## Project Description

This project is a RESTful API built on Node.js using the Express framework and MongoDB as the database with Mongoose. The API enables user registration and authentication via JWT, as well as handling contact operations.

## Project Requirements

• Before using the project, make sure to install all required packages using the command npm install.
• Configure environment variables in the .env file, such as DB_HOST, DB_PASSWORD, etc., for database connection and JWT token signing.

## Running the Project

• To run the project, use the command npm start. The project will be accessible at http://localhost:3000.

## API Endpoints
POST /users/register: Register a new user. Upon successful registration, the user will receive an email with a verification link.
POST /users/login: Authenticate a user. Use this endpoint to obtain a JWT token.
GET /contacts: Get the list of contacts. Optionally, this endpoint supports pagination and filtering based on the "favorite" field.
POST /contacts: Add a new contact.
GET /contacts/:id: Get a contact by its identifier.
PUT /contacts/:id: Update a contact by its identifier.
DELETE /contacts/:id: Delete a contact by its identifier.
PATCH /users: Update the user's subscription to one of the following values: ['starter', 'pro', 'business'].
GET /api/auth/verify/:verificationToken: Endpoint for email verification. When visited for the first time via the link, the user will receive a 200 response confirming successful verification. Upon subsequent visits, the user will receive a 404 response.

## Additional Features
• For storing user avatars, the project uses the Gravatar API. Upon registering a new user, the avatar image will be automatically generated based on the email.
• The project implements contact pagination with parameters "page" and "limit" for convenient display of the contact list.
• Updating the user's subscription to one of the following values: ['starter', 'pro', 'business'] is possible through the PATCH /users endpoint.
• The user schema includes a new property "avatarURL" for storing the avatar image.
• After registration, the user will receive an email to the provided email address with a verification link. Following the link, the user confirms successful verification.

Throughout the development of this project, we have placed significant emphasis on securing the web server to protect against cyber attacks and safeguard the confidentiality of our users. Our research and analysis have led to the identification of several potential security issues that could result in unauthorized access, data loss, or other security breaches.

## To mitigate these threats, we have implemented the following security measures:

1. Protection against code injection and XSS attacks: We have developed and implemented strict data validation for user input and defined validation rules for different types of requests. Additionally, we utilize mechanisms to filter and sanitize incoming data before processing.

2. Protection against password brute-force attacks: We have limited the number of password attempts and applied temporary account blocking after reaching a certain threshold.

3. Strong password requirements: Users are required to create strong passwords containing a combination of letters, numbers, and special characters.

4. Protection against buffer overflow and data size attacks: Data format validation and mechanisms to limit data size are used to prevent buffer overflow and other data size-related attacks.

5. Protection against unauthorized access and privilege abuse: We have implemented error handling after saving user records, including result checks, error processing, and appropriate actions such as access denial or error notifications.

6. Event and error logging: The Winston library is utilized for event and error logging to identify potential security issues and enable analysis.

7. Anomaly activity monitoring: We employ a monitoring system to detect unusual activity and potential threats, which sends notifications for further analysis and response.

Thanks to the implementation of these security measures, we have achieved a high level of protection for the web server, reduced vulnerability risks, and ensured the reliable and secure operation of our project.