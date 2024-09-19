import express from 'express';
import { config, configInitJoi } from './config/config';
import { connectDB } from './database/database';
import { MainRouter } from './router';
import { errorHandler } from './common/utils/error/errorHandler';
import bodyParser from 'body-parser';

configInitJoi();

const app = express();
const main = async () => {
  app.use(bodyParser.json());
  await connectDB();

  app.use(MainRouter);

  app.use(errorHandler);

  app.listen(config.api.port, () => {
    console.log(`running in ${config.api.port}`);
  });
};

main()