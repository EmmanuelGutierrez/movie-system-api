import 'reflect-metadata'
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
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { screeningSocket } from './modules/screening/screening.socket';
configInitJoi();

const app = express();
const server = createServer(app);
export const io = new Server(server, { connectionStateRecovery: {} });
const main = async () => {
  const mainRouter = new MainRouter();
  io.on('connection', (socket) => {
    console.log('Connection socket');
    screeningSocket(socket, io);

    socket.on('error', (error) => {
      console.log(error);
    });
  });
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(cors());
  app.use(logger('dev'));

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

  app.use((req, res, next) => {
    res.status(404).json({
      mensaje: 'not found',
      url: req.originalUrl,
    });
  });

  server.listen(config.api.port, () => {
    console.log(`running in ${config.api.port}`);
  });
};

main();
