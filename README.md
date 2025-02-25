# Assignment - 6

Welcome to Rongberong Fashion E-commerce! This README file will guide you through setting up and using the application. Below are the key features and functionalities of this full-stack e-commerce platform built with Next.js:

## Overview

Rongberong Fashion is a comprehensive e-commerce solution offering both user shopping experience and admin management capabilities. The platform enables secure transactions, efficient product management, and seamless order processing.

## Core Objectives

- Create a responsive e-commerce platform
- Implement secure user authentication
- Provide intuitive product management for admins
- Enable smooth checkout and payment processing
- Ensure efficient order management
- Maintain user profiles and shopping history

### E-commerce

## Live URL

### [Rongberong Fashion](https://meetspacemanager.vercel.app)

## Features

### Admin Features

- **User Management**

  - View and manage user list with CRUD operations
  - Access detailed user profiles and modify user permissions

- **Room Management**

  - Create, update, and delete meeting rooms
  - Set room capacity, amenities, and pricing
  - Monitor room utilization and availability

- **Slot Management**
  - Create and manage time slots for rooms
  - Configure booking durations and blackout periods
  - Real-time slot availability updates
- **Booking Overview**
  - View all bookings across rooms
  - Track booking status and payments
  - Generate usage reports

### User Features

- **Authentication & Profile**
  - Secure signup and login
  - Profile management with booking history
- **Room Booking**

  - Browse available rooms with filters
  - View room details and amenities
  - Book slots with instant confirmation
  - Real-time availability checks

- **System Features**
  - Input validation and error handling
  - Booking conflict prevention
  - Automated confirmation emails
  - Secure payment processing

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

## Project Structure

```bash
Rongberong-backend/
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
