import express from 'express';
import { eq } from 'drizzle-orm';

import { type Resources } from './Service';
import { items, ItemsType, itemsToTags } from '../../models/schema';


export class ItemController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) { }
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
}
