import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { sql } from "drizzle-orm";
export const user = sqliteTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" }).notNull().default(false),
  image: text(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const session = sqliteTable("session", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id),
  token: text().notNull(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const account = sqliteTable("account", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id),
  accountId: text().notNull(),
  providerId: text().notNull(),
  accessToken: text(),
  refreshToken: text(),
  accessTokenExpiresAt: integer({ mode: "timestamp" }),
  refreshTokenExpiresAt: integer({ mode: "timestamp" }),
  scope: text(),
  idToken: text(),
  password: text(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const verification = sqliteTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
