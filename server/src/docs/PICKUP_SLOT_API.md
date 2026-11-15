# Pickup Slot API

## Base URL

`http://localhost:8000/pickup-slot`

## Endpoints

| Method | Endpoint                   | Description                                | Access                             |
| ------ | -------------------------- | ------------------------------------------ | ---------------------------------- |
| POST   | `/create`                  | Generate pickup slots                      | Admin                              |
| GET    | `/`                        | Get all pickup dates and slots             | Admin                              |
| GET    | `/date/:date`              | Get pickup slots by date (Admin)           | Admin                              |
| GET    | `/public/:slug/date/:date` | Get public pickup slots by branch and date | Admin middleware currently applied |
| PUT    | `/deactivate/:slotId`      | Deactivate pickup slot                     | Authenticated, Active              |
| PUT    | `/activate/:slotId`        | Activate pickup slot                       | Authenticated, Active              |

### URL Parameters

| Parameter | Type             | Description            |
| --------- | ---------------- | ---------------------- |
| date      | String           | Selected date          |
| slug      | String           | Branch slug            |
| slotId    | MongoDB ObjectId | Pickup slot identifier |

### Notes

1. Generating pickup slots requires admin privileges.
2. Admin pickup slot retrieval requires admin privileges.
3. Public pickup slot retrieval currently has admin middleware in the supplied route. Review this before frontend integration.
4. Activate and deactivate operations require an authenticated and active user.
