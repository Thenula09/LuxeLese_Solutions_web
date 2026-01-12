# ER Model — Entities & Relationships (Summary)

This document summarizes the primary entities, their main fields, and relationships.

Entities

1. User
- id (ObjectId)
- name
- email (unique)
- passwordHash
- role ("customer" | "admin")
- phone
- createdAt

2. Car (Vehicle)
- id
- title
- description
- pricePerDay
- features
- images[]
- available (boolean)

3. Booking
- id
- userId -> User (FK)
- carId -> Car (FK)
- startDate
- endDate
- totalPrice
- status (pending / confirmed / cancelled / completed)
- paymentId -> Payment (nullable)

4. Payment
- id
- bookingId -> Booking (FK)
- userId -> User (FK)
- amount
- status (pending / paid / failed / refunded)
- provider
- providerRef (provider transaction id)
- createdAt

5. Review
- id
- userId -> User
- carId -> Car
- rating (1..5)
- comment
- createdAt

6. Contact
- id
- name
- email
- message
- createdAt

Relationships
- User 1..* Booking (a user can have multiple bookings)
- Car 1..* Booking (a car can be booked many times)
- Booking 1 -> 0..1 Payment (a booking may have a payment record)
- User 1..* Review, Car 1..* Review (reviews are by users for cars)

Notes
- Use MongoDB references or embed small read-only snapshots based on performance needs.
- Ensure indexes on common query fields (userId, carId, booking dates).