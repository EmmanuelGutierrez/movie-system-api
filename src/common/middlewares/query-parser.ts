import { NextFunction, Request, Response } from 'express';
import { queryParser } from '../utils/queryParser';

export function queryParserHandler(req: Request, res: Response, next: NextFunction) {
  req.query = queryParser(req.query as any);
  next();
}
