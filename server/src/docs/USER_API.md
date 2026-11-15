# User API

## Base URL

`http://localhost:8000/user`

## Endpoints

| Method | Endpoint                  | Description                    | Access                |
| ------ | ------------------------- | ------------------------------ | --------------------- |
| POST   | `/create`                 | Create a new user              | Admin                 |
| POST   | `/change-password`        | Change current user's password | Authenticated, Active |
| POST   | `/reset-password/:userId` | Reset another user's password  | Admin                 |
| GET    | `/`                       | Get all users                  | Admin                 |
| GET    | `/:userId`                | Get user by ID                 | Admin                 |
| PUT    | `/update/:userId`         | Update user                    | Admin                 |
| PUT    | `/deactivate/:userId`     | Deactivate user                | Admin                 |
| PUT    | `/activate/:userId`       | Activate user                  | Admin                 |
| DELETE | `/delete/:userId`         | Delete user                    | Admin                 |

### URL Parameters

| Parameter | Type             | Description     |
| --------- | ---------------- | --------------- |
| userId    | MongoDB ObjectId | User identifier |

### Notes

1. Admin endpoints require authentication, an active account and admin privileges.
2. Change password is available to any authenticated active user.
3. Password reset is an admin operation.
