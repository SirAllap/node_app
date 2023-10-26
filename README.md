### Node & Express app

# API Endpoints

The Authentication flow for the application is:

### API Info Endpoint

METHOD | ENDPOINT         | TOKEN | DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|---------------------------|-------------------------------------------------|--------------------
POST   | /api-info        | -     | Api endpoints information | -                                               | All endpoints

### Authentication Endpoints

METHOD | ENDPOINT         | TOKEN | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|--------------------------|-------------------------------------------------|--------------------
POST   | /login           | -     | User Login               | -                                               | token

### Bookings Endpoints
                  
METHOD | ENDPOINT            | TOKEN | DESCRIPTION              | POST PARAMS                                                     | RETURNS
-------|---------------------|-------|--------------------------|-----------------------------------------------------------------|--------------------
GET    | /bookings           | YES   | Get all bookings         | -                                                               | All bookings
GET    | /bookings/bookingId | YES   | Get one booking          | Booking ID                                                      | A single booking
POST   | /bookings           | YES   | Create a new booking     | -                                                               | Booking creation confirmation
PUT    | /bookings/bookingId | YES   | Update a booking         | Booking ID                                                      | Booking update confirmation
DELETE | /bookings/bookingId | YES   | Delete a booking         | -                                                               | Booking deletition confirmation


### Rooms Endpoints
                  
METHOD | ENDPOINT            | TOKEN | DESCRIPTION              | POST PARAMS                                                     | RETURNS
-------|---------------------|-------|--------------------------|-----------------------------------------------------------------|--------------------
GET    | /bookings           | YES   | Get all bookings         | -                                                               | All bookings
GET    | /bookings/bookingId | YES   | Get one booking          | Booking ID                                                      | A single booking
POST   | /bookings           | YES   | Create a new booking     | -                                                               | Booking creation confirmation
PUT    | /bookings/bookingId | YES   | Update a booking         | Booking ID                                                      | Booking update confirmation
DELETE | /bookings/bookingId | YES   | Delete a booking         | -                                                               | Booking deletition confirmation

### Bookings Endpoints
                  
METHOD | ENDPOINT            | TOKEN | DESCRIPTION              | POST PARAMS                                                     | RETURNS
-------|---------------------|-------|--------------------------|-----------------------------------------------------------------|--------------------
GET    | /bookings           | YES   | Get all bookings         | -                                                               | All bookings
GET    | /bookings/bookingId | YES   | Get one booking          | Booking ID                                                      | A single booking
POST   | /bookings           | YES   | Create a new booking     | -                                                               | Booking creation confirmation
PUT    | /bookings/bookingId | YES   | Update a booking         | Booking ID                                                      | Booking update confirmation
DELETE | /bookings/bookingId | YES   | Delete a booking         | -                                                               | Booking deletition confirmation

### Bookings Endpoints
                  
METHOD | ENDPOINT            | TOKEN | DESCRIPTION              | POST PARAMS                                                     | RETURNS
-------|---------------------|-------|--------------------------|-----------------------------------------------------------------|--------------------
GET    | /bookings           | YES   | Get all bookings         | -                                                               | All bookings
GET    | /bookings/bookingId | YES   | Get one booking          | Booking ID                                                      | A single booking
POST   | /bookings           | YES   | Create a new booking     | -                                                               | Booking creation confirmation
PUT    | /bookings/bookingId | YES   | Update a booking         | Booking ID                                                      | Booking update confirmation
DELETE | /bookings/bookingId | YES   | Delete a booking         | -                                                               | Booking deletition confirmation
