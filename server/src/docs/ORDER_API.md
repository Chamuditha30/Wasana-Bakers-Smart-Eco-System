# Order API

## Base URL

`http://localhost:8000/order`

## Endpoints

| Method | Endpoint               | Description                         | Access                |
| ------ | ---------------------- | ----------------------------------- | --------------------- |
| POST   | `/create/online/:slug` | Create an online order for a branch | Public                |
| POST   | `/create/pos`          | Create a POS order                  | Authenticated, Active |
| GET    | `/`                    | Get all orders with filters         | Authenticated, Active |
| GET    | `/:orderId`            | Get order by ID                     | Authenticated, Active |
| POST   | `/track`               | Track order using reference         | Authenticated, Active |
| PUT    | `/update/:orderId`     | Update order status                 | Authenticated, Active |
| PUT    | `/cancel/:orderId`     | Cancel an order                     | Authenticated, Active |

### URL Parameters

| Parameter | Type             | Description      |
| --------- | ---------------- | ---------------- |
| slug      | String           | Branch slug      |
| orderId   | MongoDB ObjectId | Order identifier |

### Notes

1. Online order creation does not require authentication middleware.
2. POS order creation requires an authenticated and active user.
3. Order retrieval, tracking, updating and cancellation require authentication and an active account.
4. Online orders are associated with a branch using its slug.
5. Order tracking uses an order reference according to the route implementation.
