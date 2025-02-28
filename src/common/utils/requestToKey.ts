import { Request } from 'express';
import { sha1 } from 'object-hash';
export const requestToKey = (req: Request) => {
  const reqDataToHash = {
    query: req.query,
    body: req.body,
  };
  console.log('reqDataToHash', reqDataToHash);
  const hashed = sha1(reqDataToHash);

  return `${req.path}@${hashed}`;
};
