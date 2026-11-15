# Authentication API

## Base URL

`http://localhost:8000/auth`

## Endpoints

| Method | Endpoint   | Description                | Access                |
| ------ | ---------- | -------------------------- | --------------------- |
| POST   | `/login`   | Login user                 | Public                |
| GET    | `/profile` | Get logged-in user profile | Authenticated, Active |
| POST   | `/logout`  | Logout user                | Public                |

### Notes

1. Authentication uses HTTP-only cookies.
2. The profile endpoint requires an authenticated and active user.
3. Login and logout do not have authentication middleware in their routes.
