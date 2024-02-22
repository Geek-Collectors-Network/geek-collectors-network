import { eq } from 'drizzle-orm';

import { BaseService, type Resources } from './Service';
import { user } from '../../models/user';

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
  }
}
