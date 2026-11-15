# Branch API

## Base URL

`http://localhost:8000/branch`

## Endpoints

| Method | Endpoint                | Description         | Access              |
| ------ | ----------------------- | ------------------- | ------------------- |
| POST   | `/create`               | Create a new branch | No route middleware |
| GET    | `/`                     | Get all branches    | No route middleware |
| GET    | `/:branchId`            | Get branch by ID    | No route middleware |
| PUT    | `/update/:branchId`     | Update branch       | No route middleware |
| PUT    | `/deactivate/:branchId` | Deactivate branch   | No route middleware |
| PUT    | `/activate/:branchId`   | Activate branch     | No route middleware |
| DELETE | `/delete/:branchId`     | Delete branch       | No route middleware |

### URL Parameters

| Parameter | Type             | Description       |
| --------- | ---------------- | ----------------- |
| branchId  | MongoDB ObjectId | Branch identifier |

### Notes

1. Branch endpoints have no authentication middleware in the supplied routes.
2. Check whether access restrictions are implemented elsewhere before exposing these endpoints to the frontend.
