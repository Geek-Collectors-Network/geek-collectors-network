import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

import { user } from './user';

export const tag = mysqlTable('tag', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  text: varchar('text', { length: 50 }).notNull().unique(),
  creatorId: int('creatorId').references(() => user.id),
});

export const userInterestTag = mysqlTable('userInterestTag', {
  // id: int('id').primaryKey().autoincrement(),
  userId: int('userId').references(() => user.id),
  tagId: int('tagId').references(() => tag.id),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
}, table => ({
  id: primaryKey({ columns: [table.userId, table.tagId] }),
}));
