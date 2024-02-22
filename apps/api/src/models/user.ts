import {
  boolean,
  date,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
  lastLoginAt: timestamp('lastLoginAt'),
  email: varchar('email', { length: 255 }).unique().notNull(),
  isEmailVerified: boolean('isEmailVerified').default(false),
  hashedPassword: varchar('hashedPassword', { length: 128 }).notNull(),
  salt: varchar('salt', { length: 128 }).notNull(),
  firstName: varchar('firstName', { length: 20 }),
  lastName: varchar('lastName', { length: 20 }),
  displayName: varchar('username', { length: 20 }),
  profileImageUrl: varchar('profileImageUrl', { length: 255 }),
  birthDate: date('birthDate'),
  isAdmin: boolean('isAdmin').default(false),
});
