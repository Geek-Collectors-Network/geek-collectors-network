import express from 'express';
import { and, eq } from 'drizzle-orm';

import { type Resources } from './Service';
import { tags, users, usersToTags, UsersType } from '../../models/schema';

import { z, ZodError } from 'zod';


const updateUserProfileSchema = z.object({
  email: z.string().email().toLowerCase(),
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  displayName: z.string().max(20),
  profileImageUrl: z.string().url().max(255),
  birthDate: z.coerce.date(),
}).partial();

export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async getProfile(id: number) {
    const results = await this.resources.db
      .select({
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        displayName: users.displayName,
        profileImageUrl: users.profileImageUrl,
        birthDate: users.birthDate,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        lastLoginAt: users.lastLoginAt,
      })
      .from(users)
      .where(eq(users.id, id));
    return results.length !== 1 ? null : results[0];
  }

  public async updateProfile(id: number, updateData: Partial<UsersType>) {
    const results = await this.resources.db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id));

    // affectedRows will be 1 even if no data was actually changed;
    // changedRows would show actual db changes (but is deprecated)
    return { updated: results[0].affectedRows === 1 };
  }

  public async getUserTags(userId: number) {
    const results = await this.resources.db
      .select({
        id: tags.id,
        text: tags.text,
      })
      .from(tags)
      .innerJoin(
        usersToTags,
        and(
          eq(usersToTags.userId, userId),
          eq(usersToTags.tagId, tags.id),
        ),
      );
    return results;
  }

  public async createTag(userId: number, tagText: string) {
    // check if tag already exists
    const tagSearchResults = await this.resources.db
      .select()
      .from(tags)
      .where(eq(tags.text, tagText));
    if (tagSearchResults.length > 0) {
      return { tagId: tagSearchResults[0].id };
    }
    // if tag doesn't exist, create it
    const tagInsertResults = await this.resources.db
      .insert(tags)
      .values({
        text: tagText,
        creatorId: userId,
      })
      .execute();
    return { tagId: tagInsertResults[0].insertId };
  }

  public async addUserTag(userId: number, tagId: number) {
    try {
      const results = await this.resources.db
        .insert(usersToTags)
        .values({
          userId,
          tagId,
        });
      return { added: results[0].affectedRows === 1 };
    } catch (err) {
      return { added: false };
    }
  }

  public async removeUserTag(userId: number, tagId: number) {
    const results = await this.resources.db
      .delete(usersToTags)
      .where(and(eq(usersToTags.userId, userId), eq(usersToTags.tagId, tagId)));
    return { removed: results[0].affectedRows === 1 };
  }
}

export class UserService {
  private readonly controller: UserController;

  constructor(resources: Resources) {
    this.controller = new UserController(resources);
  }

  public async handleGetProfile(req: express.Request, res: express.Response) {
    const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;

    const getProfileResult = await this.controller.getProfile(userId);

    if (getProfileResult) {
      return getProfileResult;
    }

    return new Error('User not found');
  }

  public async handleEditProfile(req: express.Request, res: express.Response) {
    const { userId } = req.session;

    try {
      const parsedUpdateData: Partial<UsersType> = updateUserProfileSchema.parse(req.body);
      const updateProfileResult = await this.controller.updateProfile(userId!, parsedUpdateData);

      return updateProfileResult;
    } catch (err) {
      if (err instanceof ZodError) {
        return new Error(err.errors[0].message);
      }

      return new Error('Internal Server Error');
    }
  }

  public async handleGetUserTags(req: express.Request, res: express.Response) {
    const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;

    const results = await this.controller.getUserTags(userId);
    if (results) {
      return results;
    }
    return new Error('User not found');
  }

  public async handleCreateUserTag(req: express.Request, res: express.Response) {
    const { userId } = req.session;

    const tagText = req.body.tag;

    if (!tagText) {
      return new Error('Missing tag text.');
    }
    const { tagId } = await this.controller.createTag(userId!, tagText);
    await this.controller.addUserTag(userId!, tagId);
    return tagId;
  }

  public async handleAddUserTag(req: express.Request, res: express.Response) {
    const { userId } = req.session;
    const tagId = parseInt(req.params.tagId, 10);

    const result = await this.controller.addUserTag(userId!, tagId);
    return result;
  }

  public async handleDeleteUserTag(req: express.Request, res: express.Response) {
    const { userId } = req.session;
    const tagId = parseInt(req.params.tagId, 10);

    const result = await this.controller.removeUserTag(userId!, tagId);
    return result;
  }
}
