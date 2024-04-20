# AI Powered Code Review App

## Description

This Next.js application provides a user interface for submitting code and receiving a corresponding review. The code is sent to a server-side API endpoint (/api/suggestions) for processing, and the review is displayed back to the user.

## Prerequisite

Node.js and npm (or yarn) installed on your system. You can verify their installation by running node -v and npm -v (or yarn -v) in your terminal.
Installation

Clone this repository or download the project files.

Navigate to the project directory in your terminal.

### Install dependencies:

**npm install**
(or)

**yarn install**

Create a file named .env.local in the project root directory (important: keep this file out of version control).
In .env.local, define the OPENAI_API_KEY environment variable needed by the server-side API endpoint, then provide the API key

Development

Start the development server:

**npm run dev**
(or)

**yarn dev**

Open http://localhost:3000 in your web browser to view the application.

Running the Application in Production

Build the production-ready version of the application:

**npm run build**
(or)

**yarn build**
The production build will be created in the .next directory. You can deploy this directory to any hosting platform that supports Next.js applications.

## Usage

1. Enter your code in the provided text area.
2. Click the "Review" button.
3. If the code submission is successful and the server-side API endpoint returns a review, it will be displayed in the "Review" section.

## Suggestions and explanations: The Generative AI model analyzes your code and generates suggestions for improvement. These suggestions might include:

- Ways to make your code more efficient.
- Techniques to improve the readability of your code.
- Identifying potential errors or bugs.
- Highlighting areas where best practices could be implemented.
- Explanations for the suggestions: Along with the suggestions, the AI might also provide explanations for why these improvements are recommended. This can help you understand the reasoning behind the suggestions and learn from them.

## API Endpoint

The API endpoint allows you to get code review suggestions and improvements based on the provided code snippet. It utilizes the OpenAI GPT-3.5 model to generate intelligent code review suggestions.

### Request

**Method:** POST
**Endpoint:** /api/code-review
**Headers:** None required
**Body:** JSON object containing the code snippet to be reviewed

### Response

**Content Type:** JSON

#### Success Response

**Status Code:** 200 OK
**Body:** JSON object containing the review suggestions

### Error Response

**Status Code:** 500 Internal Server Error
**Body:** JSON object with an error message if the request fails

### Environment Variable

Make sure to set the OPENAI_API_KEY environment variable with your OpenAI API key to use this endpoint.

### Dependencies

- openai: OpenAI Node.js SDK for interacting with the OpenAI API
- next/server: Next.js server-side functions for handling API requests
