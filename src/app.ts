import express from 'express';
import { config, configInitJoi } from './config/config';
import { connectDB } from './database/database';
import { MainRouter } from './router';
import { errorHandler } from './common/middlewares/errorHandler';
import bodyParser from 'body-parser';
import { queryParserHandler } from './common/middlewares/query-parser';
configInitJoi();

const app = express();
const main = async () => {
  const mainRouter = new MainRouter();
  app.use(bodyParser.json());
  app.use(queryParserHandler);
  await connectDB();

  app.use(mainRouter.getRoute());

  app.use(errorHandler);

  app.listen(config.api.port, () => {
    console.log(`running in ${config.api.port}`);
  });
};

main();
