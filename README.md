# Assignment - 3

Welcome to the Meeting Room Booking System! This README file will guide you through setting up and using the application. Below are the essential details of the project:
To install dependencies:

## Project Name

### Meeting Room Booking System

## Live URL

### [Meeting Room Booking System](https://meetspacemanager.vercel.app)

## Features

- User Authentication: Sign up and login functionality for both users and admins.
- Room Management: Admins can create, update, delete, and retrieve details about rooms.
- Slot Management: Admins can create time slots for rooms, specifying the date, start time, and end time.
- Booking Management: Users can book available time slots for meeting rooms, view booking details, and receive real-time feedback on room availability.
- Validation and Error Handling: Robust mechanisms to ensure smooth user interactions and informative messages on booking conflicts or validation errors.

## Technology Stack

- Programming Language: TypeScript
- Web Framework: Express.js
- Database and ODM: MongoDB with Mongoose

### To install dependencies

```bash
bun install
```

### Set up environment variables:

```bash
DATABASE_URI = YOUR_MONGODB_URI
PORT = 5000
JWT_SECRET = YOUR_JWT_SECRET
JWT_EXPIRES_IN = YOUR_JWT_EXPIRES_IN
```

### To run:

```bash
bun run dev
```

### To run lint:

```bash
bun run lint
```

### To fix:

```bash
bun run fix
```

### To build:

```bash
bun run build
```

### To run prod build:

```bash
bun run prod
```

### Usage

1. **Access the Application**
   Open your browser and navigate to `http://localhost:5000` (or the port you specified).

2. **Admin Operations**

   - **Create a Room:**
     ```js
     POST /api/rooms
     Authorization: Bearer <token>
     Content-Type: application/json
     {
       "name": "Conference Room",
       "roomNo": 201,
       "floorNo": 1,
       "capacity": 20,
       "pricePerSlot": 100,
       "amenities": ["Projector", "Whiteboard"]
     }
     ```
   - **Update a Room:**

     ```js
     PUT /api/rooms/:id
     Authorization: Bearer <token>
     Content-Type: application/json
     {
       "pricePerSlot": 150
     }
     ```

   - **Delete a Room:**

     ```js
     DELETE /api/rooms/:id
     Authorization: Bearer <token>
     ```

   - **Create a Slot:**
     ```js
     POST /api/slots
     Authorization: Bearer <token>
     Content-Type: application/json
     {
       "room": "60d9c4e4f3b4b544b8b8d1c5",
       "date": "2024-06-15",
       "startTime": "09:00",
       "endTime": "14:00"
     }
     ```

3. **User Operations**

   - **Sign Up:**

     ```js
     POST /api/auth/signup
     Content-Type: application/json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "phone": "1234567890",
       "role": "user",
       "address": "123 Main Street, City, Country"
     }
     ```

   - **Login:**

     ```js
     POST /api/auth/login
     Content-Type: application/json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```

   - **Book a Room:**
     ```js
     POST /api/bookings
     Authorization: Bearer <token>
     Content-Type: application/json
     {
       "room": "60d9c4e4f3b4b544b8b8d1c5",
       "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
       "date": "2024-06-15",
       "totalAmount": 200
     }
     ```

## Project Structure

```bash
meeting-room-booking-system/
├── src/
│   ├── app/
│   ├── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── eslint.config.js
├── package.json
├── README.md
└── tsconfig.json
```
