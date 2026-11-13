# Product API

## Base URL

`http://localhost:8000/product`

## Endpoints

| Method | Endpoint                 | Description          | Access                       |
| ------ | ------------------------ | -------------------- | ---------------------------- |
| POST   | `/create`                | Create a new product | Authenticated, Active        |
| GET    | `/`                      | Get all products     | Authenticated, Active        |
| GET    | `/:productId`            | Get product by ID    | Authenticated, Active        |
| PUT    | `/update/:productId`     | Update product       | Authenticated, Active        |
| PUT    | `/deactivate/:productId` | Deactivate product   | Authenticated, Active, Admin |
| PUT    | `/activate/:productId`   | Activate product     | Authenticated, Active, Admin |
| DELETE | `/delete/:productId`     | Delete product       | Authenticated, Active, Admin |

### URL Parameters

| Parameter | Type             | Description        |
| --------- | ---------------- | ------------------ |
| productId | MongoDB ObjectId | Product identifier |

### Notes

1. All product endpoints require an authenticated and active user.
2. Product operations should use the authenticated user's branch.
3. Product pricing supports the pricing types implemented in the backend.
4. Refer to the backend validation rules for accepted product fields.
