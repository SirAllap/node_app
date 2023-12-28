# API Endpoints

## Node & Express app

The Authentication flow for the application is:

### API Info Endpoint

| METHOD | ENDPOINT  | TOKEN | DESCRIPTION               | POST PARAMS | RETURNS       |
| ------ | --------- | ----- | ------------------------- | ----------- | ------------- |
| POST   | / | -     | Api endpoints information | -           | All endpoints |

### Authentication Endpoints

| METHOD | ENDPOINT | TOKEN | DESCRIPTION | POST PARAMS | RETURNS |
| ------ | -------- | ----- | ----------- | ----------- | ------- |
| POST   | /login   | -     | User Login  | -           | token   |

### Bookings Endpoints

| METHOD | ENDPOINT            | TOKEN | DESCRIPTION          | POST PARAMS | RETURNS                         |
| ------ | ------------------- | ----- | -------------------- | ----------- | ------------------------------- |
| GET    | /bookings           | YES   | Get all bookings     | -           | All bookings                    |
| GET    | /bookings/bookingId | YES   | Get one booking      | Booking ID  | A single booking                |
| POST   | /bookings           | YES   | Create a new booking | -           | Booking creation confirmation   |
| PUT    | /bookings/bookingId | YES   | Update a booking     | Booking ID  | Booking update confirmation     |
| DELETE | /bookings/bookingId | YES   | Delete a booking     | -           | Booking deletition confirmation |

### Rooms Endpoints

| METHOD | ENDPOINT      | TOKEN | DESCRIPTION       | POST PARAMS | RETURNS                      |
| ------ | ------------- | ----- | ----------------- | ----------- | ---------------------------- |
| GET    | /rooms        | YES   | Get all rooms     | -           | All rooms                    |
| GET    | /rooms/roomId | YES   | Get one room      | room ID     | A single room                |
| POST   | /rooms        | YES   | Create a new room | -           | Room creation confirmation   |
| PUT    | /rooms/roomId | YES   | Update a room     | room ID     | Room update confirmation     |
| DELETE | /rooms/roomId | YES   | Delete a room     | -           | Room deletition confirmation |

### Contacts Endpoints

| METHOD | ENDPOINT            | TOKEN | DESCRIPTION          | POST PARAMS | RETURNS                         |
| ------ | ------------------- | ----- | -------------------- | ----------- | ------------------------------- |
| GET    | /contacts           | YES   | Get all contacts     | -           | All contacts                    |
| GET    | /contacts/contactId | YES   | Get one contact      | contact ID  | A single contact                |
| POST   | /contacts           | YES   | Create a new contact | -           | Contact creation confirmation   |
| PUT    | /contacts/contactId | YES   | Update a contact     | contact ID  | Contact update confirmation     |
| DELETE | /contacts/contactId | YES   | Delete a contact     | -           | Contact deletition confirmation |

### Users Endpoints

| METHOD | ENDPOINT      | TOKEN | DESCRIPTION       | POST PARAMS | RETURNS                      |
| ------ | ------------- | ----- | ----------------- | ----------- | ---------------------------- |
| GET    | /users        | YES   | Get all users     | -           | All users                    |
| GET    | /users/userId | YES   | Get one user      | user ID     | A single user                |
| POST   | /users        | YES   | Create a new user | -           | User creation confirmation   |
| PUT    | /users/userId | YES   | Update a user     | user ID     | User update confirmation     |
| DELETE | /users/userId | YES   | Delete a user     | -           | User deletition confirmation |
