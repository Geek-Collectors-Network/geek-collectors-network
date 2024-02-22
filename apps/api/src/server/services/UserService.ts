import { eq } from 'drizzle-orm';

import { BaseService, type Resources } from './Service';
import { user } from '../../models/user';


export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async getProfile(id: number) {
    const results = await this.resources.db
      .select()
      .from(user)
      .where(eq(user.id, id));

    console.log(results);
    if (results.length !== 1) {
      return null;
    }
    // TODO: remove secret fields from result properly
    results[0].hashedPassword = '';
    results[0].salt = '';
    return results[0];
  }
}

export class UserService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/user');

    const controller = new UserController(resources);
    this.router.use(resources.session);

    // TODO: use middleware to check authentication
    this.router.get('/profile', async (req, res) => {
      const id  = req.session.userId;
      if (!id) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      const profileData = await controller.getProfile(id);
      res.status(200).json(profileData);
    });
  }
}
