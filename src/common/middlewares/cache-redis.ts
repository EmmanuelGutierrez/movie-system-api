import { NextFunction, Request, Response } from 'express';
import { queryParser } from '../utils/queryParser';
import {
  isRedisWorking,
  readDataRedis,
  writeDataRedis,
} from '../../redis/redis-client';
import { requestToKey } from '../utils/requestToKey';

export async function cacheRedisHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const iswokring = isRedisWorking();
  if (iswokring) {
    const key = requestToKey(req);
    const cachedValue = await readDataRedis(key);
    if (cachedValue) {
      try {
        return res.json(JSON.parse(cachedValue));
      } catch (error) {
        return res.json(cachedValue);
      }
    } else {
      const oldSend = res.send;
      res.send = function (data) {
        res.send = oldSend;
        if (res.statusCode.toString().startsWith('2')) {
          writeDataRedis(key, data);
        }
        return res.send(data);
      };
      next();
    }
  } else {
    console.log('no working');
    next();
  }
}
