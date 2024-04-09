import express from 'express';
import { eq, sql } from 'drizzle-orm';

import { type Resources } from './Service';
import { items, ItemsType, itemsToTags, itemsToUsersCollections } from '../../models/schema';
import { desc } from 'drizzle-orm';


export class ItemController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }

  public async getItem(id: number) {
    const item = await this.resources.db.query.items.findFirst({
      where: item_ => eq(item_.id, id),
      with: { tags: { with: { tag: true } } },
    });
    if (item) {
      item.tags = item.tags.map(tag => tag.tag.text);
    }
    return item;
  }

  public async getItemFeed(req: express.Request, res: express.Response) {
    const results = await this.resources.db.query.items.findMany({
      with: { tags: { with: { tag: true } } },
      orderBy: desc(items.createdAt),
    });
    console.log(results);
    if (results) {
      return results.map(item => ({
        ...item,
        tags: item.tags.map(tag => tag.tag.text),
      }));
    }
    return results;
  }

  public async getUserCollection(id: number) {
    // TODO: if querying another user, omit items with isHidden = true
    const results = await this.resources.db.query.itemsToUsersCollections.findMany({
      where: item_ => eq(item_.userId, id),
      with: { item: { with: { tags: { with: { tag: true } } } } },
    });
    if (results) {
      return results.map(result => ({
        ...result.item,
        notes: result.notes,
        tags: result.item.tags.map(tag => tag.tag.text),
      }));
    }
    return results;
  }

  public async addItemToCollection(userId: number, itemId: number, notes: string) {
    try {
      const results = await this.resources.db
        .insert(itemsToUsersCollections)
        .values({
          userId,
          itemId,
          notes,
        })
        .onDuplicateKeyUpdate({ set: { itemId: sql`item_id` } });
      return results[0].affectedRows === 1;
    } catch (err) {
      console.error(err);
      return false;
    }
  }


  public async getUserWishlist(id: number) {
    // TODO: if querying another user, omit items with isHidden = true
    const results = await this.resources.db.query.itemsToUsersWishlists.findMany({
      where: item_ => eq(item_.userId, id),
      with: { item: { with: { tags: { with: { tag: true } } } } },
    });
    if (results) {
      return results.map(result => ({
        ...result.item,
        notes: result.notes,
        tags: result.item.tags.map(tag => ({ id: tag.tag.id, text: tag.tag.text })),
      }));
    }
    return results;
  }
}

export class ItemService {
  private readonly controller: ItemController;

  constructor(resources: Resources) {
    this.controller = new ItemController(resources);
  }

  public async handleSearchItems(req: express.Request, res: express.Response) {}

  public async handleCreateItem(req: express.Request, res: express.Response) {}

  public async handleGetItem(req: express.Request, res: express.Response) {
    try {
      const itemId = parseInt(req.params.itemId, 10);
      const item = await this.controller.getItem(itemId);
      if (item) {
        return item;
      }
      return new Error('Item not found');
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleGetItemFeed(req: express.Request, res: express.Response) {
    try {
      return await this.controller.getItemFeed(req, res);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleUpdateItem(req: express.Request, res: express.Response) {}

  public async handleDeleteItem(req: express.Request, res: express.Response) {}

  public async handleAddItemTag(req: express.Request, res: express.Response) {}

  public async handleRemoveItemTag(req: express.Request, res: express.Response) {}


  public async handleGetUserCollection(req: express.Request, res: express.Response) {
    try {
      const userId = req.query.id ? parseInt(req.query.id.toString(), 10) : req.session.userId!;
      return await this.controller.getUserCollection(userId);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleAddItemToCollection(req: express.Request, res: express.Response) {
    try {
      const userId = req.session.userId!;
      const { itemId, notes } = req.body;
      return await this.controller.addItemToCollection(userId, itemId, notes);
      // TODO: (prompt user to) remove item from wishlist if it exists
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }

  public async handleGetUserWishlist(req: express.Request, res: express.Response) {
    try {
      const userId = req.query.id ? parseInt(req.query.id.toString(), 10) : req.session.userId!;
      return await this.controller.getUserWishlist(userId);
    } catch (err) {
      return new Error('Internal Server Error');
    }
  }
}
