import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export const validationHandler = (
  Dto: { new (): any },
  check: 'body' | 'cookies' | 'headers' | 'params' | 'query' = 'body',
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = new Dto();
    Object.assign(data, req[check]);
    const error = await validate(data, {
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
    if (error.length) {
      console.error(error);
      const errorRes = error.map((e) => ({
        property: e.property,
        constraints: e.constraints,
      }));
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
