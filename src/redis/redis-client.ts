import { Redis, RedisOptions, CommonRedisOptions } from 'ioredis';
import { config } from '../config/config';

// export const redisClient=createcli;

// export const initRedisConnection = async () => {
//   redisClient = new Redis({
//     host: config.redis.host,
//     port: config.redis.port,
//     db: config.redis.db,
//     password: config.redis.password,
//   });
//   /* try {
//     await redisClient.connect();
//     console.log('Redis connected');
//   } catch (error) {
//     console.log('error redis: ', error);
//   } */
//   redisClient.on('connect', () => console.info('Connected redis'));

//   redisClient.on('error', () => console.error('Error redis'));
// };

// export class RedisClient {
//   redisClient: Redis;
//   constructor() {
//     this.redisClient = new Redis({
//       host: config.redis.host,
//       port: config.redis.port,
//       db: config.redis.db,
//       password: config.redis.password,
//     });
//     this.redisClient.on('connect', () => console.info('Connected redis'));

//     this.redisClient.on('error', () => console.error('Error redis'));
//   }
//   //   initRedisConnection = async () => {
//   //     this.redisClient = new Redis({
//   //       host: config.redis.host,
//   //       port: config.redis.port,
//   //       db: config.redis.db,
//   //       password: config.redis.password,
//   //     });
//   //   };
// }

export const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db,
  password: config.redis.password,
});
redisClient.on('connect', () => console.info('Connected redis'));

redisClient.on('error', () => console.error('Error redis'));
redisClient.on('connecting', () => console.error('Connecting redis'));
redisClient.on('reconnecting', () => console.error('Reconnecting redis'));
redisClient.on('wait', () => console.error('Waiting redis'));
redisClient.on('ready', () => console.error('Ready redis'));
redisClient.on('close', () => console.error('close redis'));

export function isRedisWorking() {
  console.log('status', redisClient.status);
  return redisClient.status === 'ready';
}

export async function writeDataRedis(
  key: string,
  data: string | Buffer | number,
  exTime: number = 60,
) {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, data, 'EX', exTime);
    } catch (error) {
      console.error('Redis error ', error);
    }
  }
}

export async function readDataRedis(key: string) {
  if (isRedisWorking()) {
    const cachedValue = await redisClient.get(key);
    return cachedValue;
  }
}
