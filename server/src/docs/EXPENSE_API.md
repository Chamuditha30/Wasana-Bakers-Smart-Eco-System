# Expense API

## Base URL

`http://localhost:8000/expense`

## Endpoints

| Method | Endpoint             | Description                   | Access                |
| ------ | -------------------- | ----------------------------- | --------------------- |
| POST   | `/create`            | Create a new expense          | Authenticated, Active |
| GET    | `/`                  | Get all expenses with filters | Authenticated, Active |
| GET    | `/:expenseId`        | Get expense by ID             | Authenticated, Active |
| PUT    | `/update/:expenseId` | Update an expense             | Authenticated, Active |
| DELETE | `/delete/:expenseId` | Delete an expense             | Admin                 |

### URL Parameters

| Parameter | Type             | Description        |
| --------- | ---------------- | ------------------ |
| expenseId | MongoDB ObjectId | Expense identifier |

### Notes

1. All expense endpoints require authentication and an active user.
2. Deleting an expense additionally requires admin privileges.
3. Expense records should be associated with the relevant branch.
4. Refer to backend validation rules for accepted expense fields.
