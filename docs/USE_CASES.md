# Use Cases — Customer and Admin

This file lists core use cases with preconditions, main success scenario (happy path), and common alternate flows.

1) Customer: Register & Login
- Actor: Guest
- Preconditions: None
- Main flow:
  1. Guest opens sign-up page
  2. Guest submits name, email, password
  3. System validates input and creates User
  4. System returns a JWT and user profile
- Alternate flows:
  - Email already exists -> return 409 conflict

2) Customer: Search & Book a Vehicle
- Actor: Authenticated Customer
- Preconditions: User logged in
- Main flow:
  1. User searches vehicles by date/location/type
  2. System returns available vehicles
  3. User selects vehicle and provides booking dates
  4. System creates Booking with status `pending`
  5. User proceeds to payment
  6. System processes payment and marks booking `confirmed` on success
- Alternate flows:
  - Payment fails -> booking stays `pending` or is cancelled
  - Vehicle becomes unavailable between search and booking -> show error

3) Customer: Make Payment
- Actor: Authenticated Customer
- Preconditions: Booking exists and requires payment
- Main flow:
  1. Client requests payment intent with booking details
  2. Server interacts with payment provider (Stripe/other)
  3. Provider returns a payment reference and client completes the payment
  4. Provider posts webhook to `/api/payments/webhook`
  5. Server confirms payment, updates `Payment` record and Booking status
- Alternate flows: provider declines -> return payment failed

4) Admin: Manage Vehicles
- Actor: Admin user
- Preconditions: Admin logged in with correct role
- Main flow:
  1. Admin opens vehicle management UI
  2. Admin creates/edits vehicle metadata and uploads images
  3. System saves vehicle details and shows success

5) Admin: Manage Bookings & Reports
- Actor: Admin
- Preconditions: Admin logged in
- Main flow:
  1. Admin views bookings list and details
  2. Admin can change booking status, refund payments (if supported)
  3. Admin views income / booking reports in date ranges

---

If you'd like, I can expand each use case into a full BPMN-like diagram or add sequence diagrams for the backend flow (webhooks, payment flow, notifications). Let me know which use case you want fully fleshed out.