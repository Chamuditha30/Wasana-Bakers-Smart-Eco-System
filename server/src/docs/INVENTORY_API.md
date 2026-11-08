# Inventory API

## Base URL

`http://localhost:8000/inventory`

## Endpoints

| Method | Endpoint                       | Description                | Access                |
| ------ | ------------------------------ | -------------------------- | --------------------- |
| GET    | `/`                            | Get all inventories        | Authenticated, Active |
| GET    | `/:productId`                  | Get inventory by product   | Authenticated, Active |
| PUT    | `/add/:productId`              | Add inventory stock        | Authenticated, Active |
| PUT    | `/adjust/:productId`           | Adjust inventory stock     | Authenticated, Active |
| PUT    | `/update-threshold/:productId` | Update low stock threshold | Authenticated, Active |

### URL Parameters

| Parameter | Type             | Description                |
| --------- | ---------------- | -------------------------- |
| productId | MongoDB ObjectId | Related product identifier |

### Notes

1. All inventory endpoints require an authenticated and active user.
2. Inventory is associated with a product and branch.
3. Adding stock and adjusting stock are separate operations.
4. Low stock threshold determines when inventory should be considered low.
