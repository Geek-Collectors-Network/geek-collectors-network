import express from 'express';
import { eq, sql } from 'drizzle-orm';

import { type Resources } from './Service';
import { items, ItemsType, itemsToTags } from '../../models/schema';


export class ItemController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async getUserCollection(id: number) {
    const coll = await this.resources.db
      .execute(sql`
      SELECT item.*
      FROM item
      JOIN item_to_user_collection ON item.id = item_to_user_collection.item_id
      JOIN user ON user.id = item_to_user_collection.user_id
      WHERE user.id = ${id};
      `);
    return coll[0];
  }
}

export class ItemService {
  private readonly controller: ItemController;

  constructor(resources: Resources) {
    this.controller = new ItemController(resources);
  }

  public async handleSearchItems(req: express.Request, res: express.Response) {}

  public async handleCreateItem(req: express.Request, res: express.Response) {}

  public async handleGetItem(req: express.Request, res: express.Response) {}

  public async handleUpdateItem(req: express.Request, res: express.Response) {}

  public async handleDeleteItem(req: express.Request, res: express.Response) {}

  public async handleAddItemTag(req: express.Request, res: express.Response) {}

  public async handleRemoveItemTag(req: express.Request, res: express.Response) {}


  public async handleGetUserCollection(req: express.Request, res: express.Response) {
    try {
      const userId = req.params.userId ? parseInt(req.params.userId, 10) : req.session.userId!;
      return await this.controller.getUserCollection(userId);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }
}
