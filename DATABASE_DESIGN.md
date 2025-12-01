# Tavero Database Design

## Database Diagram for Teacher

Copy the code below into **[dbdiagram.io](https://dbdiagram.io)** to generate a visual ER diagram:

```dbml
// =====================================================
// TAVERO E-COMMERCE DATABASE SCHEMA
// Focus: User accounts, orders, payments & shipping
// =====================================================


// ----- GROUP 1: USERS & ADDRESSES -----

Table users {
  id int [pk, increment]
  email varchar [unique, not null]
  password varchar [not null]
  firstName varchar [not null]
  lastName varchar [not null]
  phone varchar
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table addresses {
  id int [pk, increment]
  userId int [ref: > users.id]
  street varchar [not null]
  city varchar [not null]
  postcode varchar [not null]
  country varchar [default: 'Netherlands']
  isDefault boolean [default: false]
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}


// ----- GROUP 2: ORDERS -----

Table shipping_methods {
  id int [pk, increment]
  name varchar [unique, not null]
  description varchar [not null]
  price decimal [not null]
}

Table orders {
  id int [pk, increment]
  orderNumber varchar [unique, not null]
  userId int [ref: > users.id]
  addressId int [ref: > addresses.id]
  shippingMethodId int [ref: > shipping_methods.id]
  subtotal decimal [not null]
  shippingCost decimal [not null]
  total decimal [not null]
  status order_status [default: 'PENDING']
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table order_items {
  id int [pk, increment]
  orderId int [ref: > orders.id]
  productName varchar [not null]
  size varchar [not null]
  quantity int [not null]
  price decimal [not null]
}


// ----- GROUP 3: PAYMENT & SHIPPING TRACKING -----

Table payments {
  id int [pk, increment]
  orderId int [unique, ref: - orders.id]
  paymentMethod payment_method [not null]
  cardLastFour varchar
  cardBrand varchar
  transactionId varchar [unique]
  amount decimal [not null]
  currency varchar [default: 'EUR']
  status payment_status [default: 'PENDING']
  paidAt timestamp
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}

Table order_shipping {
  id int [pk, increment]
  orderId int [unique, ref: - orders.id]
  carrier varchar
  trackingNumber varchar
  trackingUrl varchar
  shippedAt timestamp
  estimatedDelivery timestamp
  deliveredAt timestamp
  status shipping_status [default: 'PENDING']
  createdAt timestamp [default: `now()`]
  updatedAt timestamp
}


// ----- ENUMS (status values) -----

Enum order_status {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

Enum payment_method {
  CREDIT_CARD
  DEBIT_CARD
  IDEAL
  PAYPAL
  BANK_TRANSFER
}

Enum payment_status {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
  CANCELLED
}

Enum shipping_status {
  PENDING
  PROCESSING
  SHIPPED
  IN_TRANSIT
  OUT_FOR_DELIVERY
  DELIVERED
  FAILED
}
```

---

## How to Create Your Diagram

1. Go to **[dbdiagram.io](https://dbdiagram.io)**
2. Sign up for free (or use without account)
3. Delete any existing code in the editor
4. Paste the code above
5. Your diagram will appear automatically!
6. Click **Export** → **Export to PNG** or **Export to PDF** for your teacher

---

## Simple Overview: How Tables Connect

```
USER JOURNEY
============

    users
      │
      ├──> addresses (user can have multiple delivery addresses)
      │
      └──> orders (user can place multiple orders)
              │
              ├──> addresses (where to deliver)
              │
              ├──> shipping_methods (Standard or Express)
              │
              ├──> order_items (what products were ordered)
              │
              ├──> payments (ONE payment per order)
              │
              └──> order_shipping (ONE tracking record per order)
```

---

## All 7 Tables Explained

### Group 1: Users & Addresses
| Table | What it stores |
|-------|----------------|
| **users** | Customer accounts (email, password, name) |
| **addresses** | Delivery addresses for each user |

### Group 2: Orders
| Table | What it stores |
|-------|----------------|
| **shipping_methods** | Shipping options (Standard €5.99, Express €12.99) |
| **orders** | Customer purchases (order number, totals, status) |
| **order_items** | Products in each order (name, size, quantity, price) |

### Group 3: Payment & Shipping Tracking
| Table | What it stores |
|-------|----------------|
| **payments** | Payment info (method, last 4 digits, transaction ID) |
| **order_shipping** | Tracking info (carrier, tracking number, delivery status) |

---

## Relationship Types

**One-to-Many (>)** = One record connects to many records
- Example: One user → many orders
- Example: One order → many order items

**One-to-One (-)** = One record connects to exactly one record  
- Example: One order → one payment
- Example: One order → one shipping record

---

## Total: 7 Tables

1. users
2. addresses
3. shipping_methods
4. orders
5. order_items
6. payments
7. order_shipping

---

## Summary for Teacher

This database stores all **user-related information** for the Tavero webshop:

1. **Who** is the customer (users, addresses)
2. **What** did they order (orders, order_items)
3. **How** did they pay (payments)
4. **Where** is their package (order_shipping)

Product information (shirts, images, sizes) is stored separately in the application code, keeping this database focused on customer transactions.
