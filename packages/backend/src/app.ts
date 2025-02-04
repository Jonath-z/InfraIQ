import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { NODE_ENV, PORT } from '@config';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(Controllers: Function[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeRoutes(Controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeRoutes(controllers: Function[]) {
    useExpressServer(this.app, {
      cors: '*',
      controllers: controllers,
    });
  }
}
