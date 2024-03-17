import express from 'express';
import { and, eq } from 'drizzle-orm';

import { type Resources } from './Service';
import { users, UsersType } from '../../models/schema';

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

  public async getUserInterestTags(userId: number) {
    const results = await this.resources.db
      .select({
        id: tag.id,
        text: tag.text,
      })
      .from(tag)
      .innerJoin(
        userInterestTag,
        and(
          eq(userInterestTag.userId, userId),
          eq(userInterestTag.tagId, tag.id),
        ),
      );
    return results;
  }

  public async createTag(userId: number, tagText: string) {
    // check if tag already exists
    const tagSearchResults = await this.resources.db
      .select()
      .from(tag)
      .where(eq(tag.text, tagText));
    if (tagSearchResults.length > 0) {
      return { tagId: tagSearchResults[0].id };
    }
    // if tag doesn't exist, create it
    const tagInsertResults = await this.resources.db
      .insert(tag)
      .values({
        text: tagText,
        creatorId: userId,
      })
      .execute();
    return { tagId: tagInsertResults[0].insertId };
  }

  public async addUserInterestTag(userId: number, tagId: number) {
    try {
      const results = await this.resources.db
        .insert(userInterestTag)
        .values({
          userId,
          tagId,
        });
      return { added: results[0].affectedRows === 1 };
    } catch (err) {
      // TODO: seperately handle duplicate key error and tag not found error
      return { added: false };
    }
  }

  public async removeUserInterestTag(userId: number, tagId: number) {
    const results = await this.resources.db
      .delete(userInterestTag)
      .where(and(eq(userInterestTag.userId, userId), eq(userInterestTag.tagId, tagId)));
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

    this.router.get('/interests/:userId?', async (req, res) => {
      const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;
      const results = await controller.getUserInterestTags(userId);
      res.status(200).json(results);
    });

    this.router.post('/interests/create', async (req, res) => {
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      const tagText = req.body.tag;
      if (!tagText) {
        res.status(400).json({ error: 'Missing tag' });
        return;
      }
      const createTagResult = await controller.createTag(id, tagText);
      await controller.addUserInterestTag(id, createTagResult.tagId);
      res.status(201).json({ tagId: createTagResult.tagId });
    });

    this.router.post('/interests/:tagId', async (req, res) => {
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      const tagId = parseInt(req.params.tagId, 10);
      const addInterestTagResult = await controller.addUserInterestTag(id, tagId);
      res.status(200).json(addInterestTagResult);
    });

    this.router.delete('/interests/:tagId', async (req, res) => {
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      const tagId = parseInt(req.params.tagId, 10);
      const removeInterestTagResult = await controller.removeUserInterestTag(id, tagId);
      res.status(200).json(removeInterestTagResult);
    });
  }
}
