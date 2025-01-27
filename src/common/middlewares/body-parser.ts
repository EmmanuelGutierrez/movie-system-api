import { NextFunction, Request, Response } from 'express';
import { queryParser } from '../utils/queryParser';

export function bodyParserHandler(req: Request, res: Response, next: NextFunction) {
  req.body = queryParser(req.body as any);
  next();
}
