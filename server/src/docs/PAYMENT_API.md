# Payment API

## Base URL

`http://localhost:8000/payment`

## Endpoints

| Method | Endpoint              | Description                   | Access                |
| ------ | --------------------- | ----------------------------- | --------------------- |
| GET    | `/`                   | Get all payments with filters | Authenticated, Active |
| GET    | `/:paymentId`         | Get payment by ID             | Authenticated, Active |
| PUT    | `/confirm/:paymentId` | Confirm a payment             | Authenticated, Active |
| PUT    | `/reject/:paymentId`  | Reject a payment              | Authenticated, Active |

### URL Parameters

| Parameter | Type             | Description        |
| --------- | ---------------- | ------------------ |
| paymentId | MongoDB ObjectId | Payment identifier |

### Notes

1. All payment endpoints require an authenticated and active user.
2. Payment confirmation and rejection are separate operations.
3. Payment status changes should follow the backend payment validation rules.
4. Payment operations are associated with their relevant orders.
