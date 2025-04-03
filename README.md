# Rento Property Management

**Rento Property Management** is a property management application that provides separate interfaces for both landlords and tenants. Through this platform, landlords can manage their properties and tenants can get information about available properties, apply and make payments.

## Features

### Landlord
- **Property Management:** Add, edit, and delete properties.
- **Tenant Tracking:** Maintain a list of tenants and record their payments.
- **Request Management:** Manage and resolve tenant requests and issues.

### Tenant
- **Property Search:** Browse and book available properties.
- **Payment Status:** View the status of rent payments.
- **Direct Communication:** Easily contact the landlord.

## Technical Details

- **Backend:** Built with Node.js and Express.js.
- **Deployment:** Hosted on Amazon Web Services (AWS).
- **Database:** Utilizes AWS DynamoDB.

## Installation and Setup Instructions

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/businessrentoapp/backend-rentoapp.git
    ```
    
2. **Backend Setup:**
    ```bash
    npm install
    ```
    ### Configure the required environment variables in a .env file
    ```bash
    npm start


# API Routes

**Base URL:** `http://localhost:3000`

---

## 1. Auth APIs

**User Registration & Login:**
- **POST** `/api/v1/auth/register`
- **POST** `/api/v1/auth/login`
- **POST** `/api/v1/auth/verify-otp`

**User Profile:**
- **GET** `/api/v1/auth/user/profile`  *(Retrieve user profile)*
- **PUT** `/api/v1/auth/user/profile`  *(Update user profile)*

**Dashboard Endpoints:**
- **GET** `/api/v1/auth/tenant/dashboard`  *(Tenant Dashboard)*
- **GET** `/api/v1/auth/landlord/dashboard`  *(Landlord Dashboard)*

---

## 2. Analytics APIs

- **GET** `/api/v1/analytics/home`
- **GET** `/api/v1/analytics/inventory`
- **GET** `/api/v1/analytics/payments`  *(Query Parameter: `?month=...`)*
- **PATCH** `/api/v1/analytics/payments/:tenantId`
- **GET** `/api/v1/analytics/complaints`

---

## 3. Complaints APIs

- **POST** `/api/v1/complaints`  *(Create Complaint)*
- **GET** `/api/v1/complaints/tenant`  *(Fetch Tenant Complaints)*
- **GET** `/api/v1/complaints/landlord`  *(Fetch Landlord Complaints)*
- **PUT** `/api/v1/complaints/:id/status`  *(Update Complaint Status)*

---

## 4. Inventory APIs

**Property Inventory:**
- **GET** `/api/v1/inventory/:propertyId`

**Room Management:**
- **POST** `/api/v1/inventory/:propertyId/rooms`  *(Add Room)*
- **PUT** `/api/v1/inventory/:propertyId/rooms`  *(Update Room - expects `floorIndex` & `roomIndex` in body)*
- **DELETE** `/api/v1/inventory/:propertyId/rooms`  *(Delete Room - expects `floorIndex` & `roomIndex` in body)*

**Unit Management:**
- **POST** `/api/v1/inventory/:propertyId/units`  *(Add Unit)*
- **PUT** `/api/v1/inventory/:propertyId/units/:unitIndex`  *(Update Unit)*
- **DELETE** `/api/v1/inventory/:propertyId/units/:unitIndex`  *(Delete Unit)*

**Tenant Assignment (For Bed-based Inventory):**
- **PUT** `/api/v1/inventory/:propertyId/rooms/:roomId/beds/:bedIndex/assign`
- **PUT** `/api/v1/inventory/:propertyId/rooms/:roomId/beds/:bedIndex/unassign`

---

## 5. KYC APIs

- **POST** `/api/v1/kyc/verify`  *(Verify Tenant KYC)*

---

## 6. Notification APIs

- **GET** `/api/v1/notification/:recipientId/:recipientModel`  *(Fetch Notifications)*
- **PATCH** `/api/v1/notification/:notificationId/read`  *(Mark Notification as Read)*

---

## 7. Payments APIs

- **POST** `/api/v1/payments/collect`  *(Collect Rent)*
- **GET** `/api/v1/payments/history`  *(View Rent History)*
- **PATCH** `/api/v1/payments/update-status`  *(Update Payment Status)*

---

## 8. Property Management APIs

**Public / Listing Endpoints:**
- **GET** `/api/v1/property/available`  *(Get Available Properties)*
- **GET** `/api/v1/property/nearby`  *(Get Properties Near Location)*
- **POST** `/api/v1/property/:propertyId/rent`  *(Rent a Property)*

**Landlord Management Endpoints:**
- **POST** `/api/v1/property`  *(Add Property)*
- **PUT** `/api/v1/property/:propertyId`  *(Update Property)*
- **GET** `/api/v1/property`  *(List All Properties)*
- **GET** `/api/v1/property/:propertyId`  *(View a Single Property)*
- **DELETE** `/api/v1/property/:propertyId`  *(Delete Property)*

---

## 9. Reviews APIs

- **POST** `/api/v1/reviews`  *(Submit Review)*
- **PUT** `/api/v1/reviews/:reviewId`  *(Modify Review)*
- **DELETE** `/api/v1/reviews/:reviewId`  *(Remove Review)*
- **GET** `/api/v1/reviews/:propertyId`  *(Fetch Property Reviews)*
- **GET** `/api/v1/reviews/:propertyId/average`  *(Fetch Property Average Rating)*

---

## 10. Share Property APIs

- **POST** `/api/v1/shareProperty/share`  *(Share Property)*

---

## 11. Tenant Management APIs

- **POST** `/api/v1/tenantManagement`  *(Add Tenant)*
- **GET** `/api/v1/tenantManagement`  *(List Tenants)*
- **GET** `/api/v1/tenantManagement/:id`  *(View Tenant Details)*

---

**Usage:**

इन endpoints का उपयोग करते समय ध्यान दें कि जिन endpoints पर `authMiddleware` लागू है, उन्हें एक्सेस करने के लिए उपयुक्त authentication token भेजना आवश्यक होगा। यह डॉक्यूमेंट नए डेवलपर्स के लिए API structure का एक स्पष्ट overview प्रदान करता है।
