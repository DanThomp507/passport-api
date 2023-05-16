# Passport API

This API is designed to process passport images and extract the date of birth and expiry date. It utilizes the Mindee API for document parsing and processing.

The API accepts a passport image file and returns the extracted date of birth and expiry date as a response.

## Prerequisites

Before running the API, make sure you have the following prerequisites installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies by running the following command: `npm install`

4. Create a `.env` file in the project directory and provide the Mindee API key in the following format: `MINDEE_API_KEY=your_mindee_api_key`

You will have to generate this key on the Mindee Platform: `https://platform.mindee.com/`

Instructions to do so are here: `https://developers.mindee.com/docs/create-api-key`

## Local Usage

To start the API, run the following command: `npm start`

The API will be running on `http://localhost:3001`.

To get the passport data locally, run `curl -X POST -F 'passport=@/<insert file path>' http://localhost:3001/api/passport `

Supported file types are: PDF, PNG, JPEG

## Deployments

The Passport API is deployed and hosted on Render, a cloud platform for deploying applications.

The API endpoints are accessible at https://passport-api.onrender.com.

An example of how you can hit these endpoints can be found on Postman: `https://www.postman.com/danthomp507/workspace/my-workspace/request/7132737-28387776-9c78-432d-99cd-26c51dd48870`

In the request, all you need to do is update the passport file value with your own.

## API Endpoints

### POST /api/passport

This endpoint accepts a passport image file and returns the extracted date of birth and expiry date from the passport.

#### Request

- Method: POST
- Endpoint: `/api/passport`
- Headers:
  - `Content-Type: multipart/form-data`
- Body:
  - Field: `passport` (Passport image file)

#### Response

- Status: 200 OK
- Body: JSON object containing the date of birth and expiry date extracted from the passport:

  ```json
  {
    "birthDate": "YYYY-MM-DD",
    "expiryDate": "YYYY-MM-DD"
  }
  ```

- Status: 500 Internal Server Error
- Body: JSON object with an error message indicating the cause of the error.

### Dependencies

The following dependencies are used in this API:

- `express`: Web application framework for Node.js.
- `multer`: Middleware for handling multipart/form-data, used for file uploads.
- `dotenv`: Loads environment variables from a .env file.
- `mindee`: SDK for interacting with the Mindee API.
- `typescript`: TypeScript language support for development.
- `@types/express`: TypeScript typings for Express.
- `@types/multer`: TypeScript typings for Multer.
- `read-chunk`: Reads a chunk from a file.
