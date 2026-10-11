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
