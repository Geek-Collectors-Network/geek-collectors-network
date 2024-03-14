import { type Resources } from './services/Service';

import express from 'express';

// Middleware
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import { logger } from '../modules/logger';

export class Server {
  public readonly app: express.Application;
  private server: ReturnType<express.Application['listen']> | null = null;

  constructor(resources: Resources, routes: Record<string, express.Router>) {
    this.app = express();

    this.app.use(resources.sessions);

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan('combined', {
      stream: {
        write: (msg: string) => logger.info(msg.trim()),
      },
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    Object.entries(routes).forEach(([route, router]) => {
      this.app.use(route, router);
    });

    this.app.get('/health', (_, res) => res.status(200).json({
      msg: 'OK',
    }));

    this.app.use('*', (_, res) => res.status(404).json({
      msg: 'Not Found',
    }));
  }

  public start(host: string, port: number): void {
    this.server = this.app.listen(port, host, () => {
      logger.info(`Server running at http://${host}:${port}`);
    });
  }

  public stop() {
    this.server?.close();
  }
}
