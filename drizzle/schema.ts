import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Products table - stores e-cigarette products
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  brand: varchar("brand", { length: 100 }).notNull(),
  flavor: varchar("flavor", { length: 100 }).notNull(),
  nicotineContent: varchar("nicotineContent", { length: 50 }).notNull(), // e.g., "0mg", "6mg", "12mg"
  price: int("price").notNull(), // in cents (AUD)
  stock: int("stock").notNull().default(0),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  sku: varchar("sku", { length: 100 }).unique(),
  category: varchar("category", { length: 100 }), // e.g., "pod", "disposable", "mod"
  isActive: int("isActive").default(1), // 1 = active, 0 = inactive
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Orders table - stores customer orders
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderNumber: varchar("orderNumber", { length: 50 }).unique().notNull(), // e.g., "ORD-20260101-001"
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"]).default("pending").notNull(),
  subtotalAmount: int("subtotalAmount").notNull(), // in cents
  taxAmount: int("taxAmount").notNull(), // in cents
  shippingCost: int("shippingCost").notNull(), // in cents
  totalAmount: int("totalAmount").notNull(), // in cents
  shippingAddress: text("shippingAddress").notNull(), // JSON string
  paymentMethod: varchar("paymentMethod", { length: 50 }), // e.g., "credit_card", "paypal"
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  paymentIntentId: varchar("paymentIntentId", { length: 255 }), // for third-party payment tracking
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order items table - stores individual items in each order
 */
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: int("unitPrice").notNull(), // in cents, price at time of purchase
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * User addresses table - stores shipping and billing addresses
 */
export const userAddresses = mysqlTable("userAddresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  street: varchar("street", { length: 255 }).notNull(),
  suburb: varchar("suburb", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(), // e.g., "NSW", "VIC", "QLD"
  postcode: varchar("postcode", { length: 10 }).notNull(),
  country: varchar("country", { length: 100 }).default("Australia").notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  isDefault: int("isDefault").default(0), // 1 = default, 0 = not default
  addressType: mysqlEnum("addressType", ["shipping", "billing", "both"]).default("shipping").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserAddress = typeof userAddresses.$inferSelect;
export type InsertUserAddress = typeof userAddresses.$inferInsert;

/**
 * Age verifications table - audit trail for age gate verification
 */
export const ageVerifications = mysqlTable("ageVerifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // null for anonymous users
  verificationMethod: varchar("verificationMethod", { length: 50 }).notNull(), // e.g., "birthdate", "checkbox"
  verifiedAt: timestamp("verifiedAt").notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }), // supports IPv4 and IPv6
  userAgent: text("userAgent"),
  isVerified: int("isVerified").default(1), // 1 = verified, 0 = failed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AgeVerification = typeof ageVerifications.$inferSelect;
export type InsertAgeVerification = typeof ageVerifications.$inferInsert;

/**
 * Carts table - stores shopping cart data
 */
export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  sessionId: varchar("sessionId", { length: 255 }), // for anonymous users
  cartData: text("cartData").notNull(), // JSON string of cart items
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Cart = typeof carts.$inferSelect;
export type InsertCart = typeof carts.$inferInsert;