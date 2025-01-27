import express from 'express';
import cors from 'cors';
import { config, configInitJoi } from './config/config';
import { connectDB } from './database/database';
import { MainRouter } from './router';
import { errorHandler } from './common/middlewares/errorHandler';
import bodyParser from 'body-parser';
import { queryParserHandler } from './common/middlewares/query-parser';
import './redis/redis-client';
import './common/auth/strategies/passport-jwt';
import './common/auth/strategies/passport-local';
import './common/models/user-request';
import { seedRoles } from './seed/roles.seed';
// import { initRedisConnection } from './redis/redis-client';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerDocs } from './common/utils/swagger-documentation';
configInitJoi();

const app = express();
const main = async () => {
  const mainRouter = new MainRouter();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(cors());
  // app.use('/api-doc/swagger.json', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
  // console.log();
  // console.log();
  app.use('/api-doc/json', (req, res) => {
    res.json(swaggerDocs);
  });
  app.use(
    '/api-doc',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerDocs),
  );
  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(queryParserHandler);
  // await initRedisConnection();
  await connectDB();
  // seedRoles();
  app.use(mainRouter.getRoute());

  app.use(errorHandler);

  app.listen(config.api.port, () => {
    console.log(`running in ${config.api.port}`);
  });
};

main();
