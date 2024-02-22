import {
  mysqlTable,
  serial,
  timestamp,
} from 'drizzle-orm/mysql-core';

import { user } from './user';


export const tag = mysqlTable('tag', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  creatorId: serial('creatorId').references(() => user.id),
});

export const userInterestTag = mysqlTable('userInterestTag', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('createdAt').notNull().$defaultFn(() => new Date()),
  userId: serial('userId').references(() => user.id),
  tagId: serial('tagId').references(() => tag.id),
});
