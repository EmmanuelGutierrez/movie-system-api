import { isObject, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../utils/error/HttpException';
import { plainToClass, plainToInstance } from 'class-transformer';

export const validationHandler = (
  Dto: { new (): any },
  check: 'body' | 'cookies' | 'headers' | 'params' | 'query' = 'body',
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // const data = new Dto();
    const data=plainToInstance(Dto,req[check])
    // Object.assign(data, req[check]);
    const error = await validate(data, {
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
    if (error.length) {
      // console.error(error);
      // console.error(error[0].children);
      const errorRes = error.map((e) => ({
        property: e.property,
        constraints: e.constraints,
        children: e.children?.map((ch) => ({
          property: ch.property,
          constraints: ch.constraints,
          children: ch.children?.map((chi) => ({
            property: chi.property,
            constraints: chi.constraints,
            // children: e.children?.map((ch) => ({})),
          })),
        })),
      }));

      // throw new HttpException(errorRes.toString(), 400);
      return res.status(400).json(errorRes);
    }
    next();
    /* try {
      await validateOrReject(data);
      next();
    } catch (error) {
      return res.status(400).json(error);
    } */
  };
};
