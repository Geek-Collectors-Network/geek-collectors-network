import { eq } from 'drizzle-orm';

import { BaseService, type Resources } from './Service';
import { user } from '../../models/user';
import { tag, userInterestTag } from '../../models/tag';

import { z, ZodError } from 'zod';

type ProfileData = {
  email?: string
  firstName?: string
  lastName?: string
  displayName?: string
  profileImageUrl?: string
  birthDate?: Date
};

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

  public async updateProfile(id: number, updateData: ProfileData) {
    const results = await this.resources.db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id));

    // affectedRows will be 1 even if no data was actually changed;
    // changedRows would show actual db changes (but is deprecated)
    return { updated: results[0].affectedRows === 1 };
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
    const results = await this.resources.db
      .insert(userInterestTag)
      .values({
        userId,
        tagId,
      });
    return { added: results[0].affectedRows === 1 };
  }
}

export class UserService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/user');

    const controller = new UserController(resources);
    this.router.use(resources.session);

    // TODO: use middleware to check authentication

    this.router.get('/profile', async (req, res) => {
      // TODO: use query param to get profile of specified user (if friend)
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      const getProfileResult = await controller.getProfile(id);
      if (getProfileResult) {
        res.status(200).json(getProfileResult);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });

    this.router.patch('/profile', async (req, res) => {
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      try {
        const parsedUpdateData: ProfileData = updateUserProfileSchema.parse(req.body);
        const updateProfileResult = await controller.updateProfile(id, parsedUpdateData);
        res.status(200).json(updateProfileResult);
      } catch (err) {
        if (err instanceof ZodError) {
          res.status(400).json({ errors: err.errors });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });

    this.router.post('/interests/create', async (req, res) => {
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      // TODO: validate tag text (?)
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
  }
}
