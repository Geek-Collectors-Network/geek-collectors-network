import { and, eq } from 'drizzle-orm';

import { BaseService, type Resources } from './Service';
import { user, UserType, userInterestTag, tag } from '../../models/schema';
import { authenticate } from '../middleware/Authenticate';

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
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        profileImageUrl: user.profileImageUrl,
        birthDate: user.birthDate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
      })
      .from(user)
      .where(eq(user.id, id));
    return results.length !== 1 ? null : results[0];
  }

  public async updateProfile(id: number, updateData: Partial<UserType>) {
    const results = await this.resources.db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id));

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

  // TODO: delete tag if no other users have it (?)
  public async removeUserInterestTag(userId: number, tagId: number) {
    const results = await this.resources.db
      .delete(userInterestTag)
      .where(and(eq(userInterestTag.userId, userId), eq(userInterestTag.tagId, tagId)));
    return { removed: results[0].affectedRows === 1 };
  }
}

export class UserService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/user');

    const controller = new UserController(resources);
    this.router.use(authenticate);

    this.router.get('/:userId?/profile', async (req, res) => {
      const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;
      const getProfileResult = await controller.getProfile(userId);
      if (getProfileResult) {
        res.status(200).json(getProfileResult);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });

    this.router.patch('/profile', async (req, res) => {
      const { userId } = req.session;
      try {
        const parsedUpdateData: Partial<UserType> = updateUserProfileSchema.parse(req.body);
        const updateProfileResult = await controller.updateProfile(userId!, parsedUpdateData);
        res.status(200).json(updateProfileResult);
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({ errors: err.errors });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

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
