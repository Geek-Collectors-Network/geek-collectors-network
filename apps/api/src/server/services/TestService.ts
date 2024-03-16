import { BaseService, type Resources } from './Service';

export class TestService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/');

    this.router.get('/test', async (req, res) => {
      const results = await this.resources.db
        .query
        .users
        .findMany({
          with: {
            tags: {
              columns: {
                userId: false,
                tagId: false,
              },
              with: {
                tag: {
                  columns: {
                    text: true,
                  },
                },
              },
            },
          },
        });

      res.status(200).json({
        results,
      });
    });
  }
}
