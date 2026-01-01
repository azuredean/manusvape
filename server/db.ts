import { eq, gte, lte, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  products,
  orders,
  orderItems,
  userAddresses,
  ageVerifications,
  InsertProduct,
  InsertOrder,
  InsertOrderItem,
  InsertUserAddress,
  InsertAgeVerification,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ PRODUCTS ============
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(products);
}

export async function getProductById(productId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductsByFilters(filters: {
  brand?: string;
  flavor?: string;
  nicotineContent?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions: any[] = [eq(products.isActive, 1)];

  if (filters.brand) {
    conditions.push(eq(products.brand, filters.brand));
  }
  if (filters.flavor) {
    conditions.push(eq(products.flavor, filters.flavor));
  }
  if (filters.nicotineContent) {
    conditions.push(eq(products.nicotineContent, filters.nicotineContent));
  }
  if (filters.category) {
    conditions.push(eq(products.category, filters.category));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice));
  }

  const limit = filters.limit || 50;
  const offset = filters.offset || 0;

  return await db
    .select()
    .from(products)
    .where(and(...conditions))
    .limit(limit)
    .offset(offset);
}

// ============ ORDERS ============
export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(orders).values(order);
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orders).where(eq(orders.userId, userId));
}

export async function getOrderById(orderId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ ORDER ITEMS ============
export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

// ============ USER ADDRESSES ============
export async function getUserAddresses(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(userAddresses).where(eq(userAddresses.userId, userId));
}

export async function createUserAddress(address: InsertUserAddress) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(userAddresses).values(address);
}

// ============ AGE VERIFICATIONS ============
export async function recordAgeVerification(verification: InsertAgeVerification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(ageVerifications).values(verification);
}

export async function getLatestAgeVerification(userId?: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  if (userId) {
    const result = await db
      .select()
      .from(ageVerifications)
      .where(eq(ageVerifications.userId, userId))
      .orderBy(desc(ageVerifications.createdAt))
      .limit(1);
    return result.length > 0 ? result[0] : undefined;
  }
  return undefined;
}

// ============ CARTS ============
export async function getCartBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  // Note: carts table not fully implemented yet
  return undefined;
}
