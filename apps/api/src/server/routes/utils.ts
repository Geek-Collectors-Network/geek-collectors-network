import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      page: number;
      limit: number;
    }
  }
}

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 25;

type ResponseData = string | number | object | Error
type Handler<T extends ResponseData> = (req: express.Request, res: express.Response, next: express.NextFunction) => T
type HandlerPromise<T extends ResponseData> = (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<T>

export type ResponseBody = {
  isError?: boolean,
  data: unknown,
  pagination?: {
    prev?: string | null
    next?: string | null
  }
}

/**
 * Creates a subset of an array from the n-th element [from] to the m-th element [to].
 */
export function arraySubset<T>(data: T[], from: number, to: number) {
  const _data: T[] = [];

  for (let index = from; index < to; index++) {
    _data[index - from] = data[index];
  }

  return _data;
}

export function createPaginationLink(url: string, dataLength: number, page: number, limit: number) {
  const maxPages = Math.ceil(dataLength / limit);

  if (page < 0 || page >= maxPages) return null;

  const _url = new URL(url);
  _url.searchParams.set('page', page.toString());
  _url.searchParams.set('limit', limit.toString());

  return _url.toString();
}

function isError(err: unknown): err is Error {
  return err instanceof Error;
}

export function sendResponse<T extends ResponseData>(status: number, data: T) {
  return (req: express.Request, res: express.Response) => {
    const _isError = isError(data);

    const responseBody: ResponseBody = {
      isError: _isError,
      data,
      pagination: {
        prev: null,
        next: null,
      },
    };

    if (!Array.isArray(data)) {
      responseBody.data = _isError ? data.message : data;
      // NOTE: Want to remove paginations on non-array responses?
      // delete responseBody.pagination;

      return res.status(status).json(responseBody);
    }

    // NOTE: Only non-error arrays past this point, isError will always be false

    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req;
    const subsetFrom = page * limit;
    const subsetTo = Math.min(data.length, subsetFrom + limit);

    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const _createPaginationLink = createPaginationLink.bind(null, fullUrl, data.length);
    const prev = _createPaginationLink(page - 1, limit);
    const next = _createPaginationLink(page + 1, limit);

    responseBody.data = arraySubset(data, subsetFrom, subsetTo);
    responseBody.pagination!.next = next;
    responseBody.pagination!.prev = prev;

    return res.status(status).json(responseBody);
  };
}

export function use<T extends ResponseData>(handler: Handler<T> | HandlerPromise<T>) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      let data = handler(req, res, next);

      // A flakey test to determine is the handler returned a promise
      if (data && typeof (data as Promise<T>).then === 'function') {
        data = await data;
      }

      if (isError(data)) throw data;

      // Rare, but we should handle arrays of errors as well
      if (Array.isArray(data)) {
        data.filter(isError)
          .forEach(err => {
            throw err;
          });
      }

      sendResponse(200, data)(req, res);
    } catch (err) {
      sendResponse(500, err as Error)(req, res);
    }
  };
}

