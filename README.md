To run the project, you need to have Node.js installed on your machine. If you don't have it, you can download it [here](https://nodejs.org/).

## Setup

Edit the env vars in the `src/main/config/env.ts` file to match your environment.

Run the following commands to build and start the project and db in containers:
```bash
npm run up
```

## Tests
Run the following command to run the tests:
```bash
npm test
```

Run the folowwing command to run the tests with coverage:
```bash
npm run test:coverage
```

## POST /api/signup
  Create a new user account.

    - Method: POST
    - Body:
      - `name`: string
      - `email`: string
      - `password`: string
      - `passwordConfirmation`: string
    - Response:
      - `id`: string
      - `name`: string
      - `email`: string
      - `password`: string

## POST /api/login
    Authenticate a user and retrieve a token.

    - Method: POST
    - Body:
      - `name`: string
      - `email`: string
    - Response:
      - `token`: string

## POST /api/post

Create a new post.

  - Method: POST
  - Headers
    - `x-access-token`: token
  - Body:
    - `name`: string
    - `content`: string
    - `userId`: string
  - Response
    - `id`: string
    - `name`: string
    - `content`: string
    - `userId`: string

## GET /api/post
Get a list of posts.

    - Method: GET
    - Query
      - `userId?`: string
      - `name?`: string
    - Response
      - `id`: string
      - `name`: string
      - `content`: string
      - `userId`: string