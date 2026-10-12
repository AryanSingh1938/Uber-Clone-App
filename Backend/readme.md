# Backend API

## Register User

Creates a user account and returns an authentication token.

- **Method:** `POST`
- **Endpoint:** `/users/register`
- **Content-Type:** `application/json`

### Request body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

All fields are required. `fullname.firstname` must be at least 3 characters, `fullname.lastname` is required, `email` must be a valid email address, and `password` must be at least 6 characters long.

### Responses

- **201 Created** — Registration succeeded. Returns the user and an authentication token.

  ```json
  {
    "token": "<authentication-token>",
    "user": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com"
    }
  }
  ```

- **400 Bad Request** — Request validation failed. The response includes validation errors in the `error` array.

  ```json
  {
    "error": [
      {
        "msg": "Invalid Email"
      }
    ]
  }
  ```

## Login User

Authenticates an existing user and returns an authentication token.

- **Method:** `POST`
- **Endpoint:** `/users/login`
- **Content-Type:** `application/json`

### Request body

Send a JSON object with the following structure:

```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

Both fields are required. `email` must be a valid email address, and `password` must be at least 6 characters long.

### Responses

- **200 OK** — Login succeeded. Returns the user and an authentication token.

  ```json
  {
    "token": "<authentication-token>",
    "user": {
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com"
    }
  }
  ```

- **400 Bad Request** — Request validation failed. The response includes validation errors in the `errors` array.

  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email"
      }
    ]
  }
  ```

- **401 Unauthorized** — The email does not belong to an account, or the password is incorrect.

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

## Get User Profile

Returns the authenticated user's profile.

- **Method:** `GET`
- **Endpoint:** `/users/profile`
- **Authentication:** Required. Send the token in the `token` cookie or as the second, space-separated value in the `Authorization` header.

### Responses

- **200 OK** — Returns the authenticated user. The password is not included.

  ```json
  {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
  }
  ```

- **401 Unauthorized** — The token is missing, invalid, expired, or rejected.

  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Logout User

Logs out the authenticated user by clearing the `token` cookie and recording the token in the blacklist.

- **Method:** `GET`
- **Endpoint:** `/users/logout`
- **Authentication:** Required. Send the token in the `token` cookie or as the second, space-separated value in the `Authorization` header.

### Responses

- **200 OK** — Logout succeeded.

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- **401 Unauthorized** — The token is missing, invalid, expired, or rejected.

  ```json
  {
    "message": "Unauthorized"
  }
  ```
