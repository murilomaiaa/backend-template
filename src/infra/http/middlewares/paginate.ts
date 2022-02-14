import { Request, Response } from 'express';

type PaginateProps = {
  skip?: number;
  take: number;
};

export const paginate =
  ({ skip = 0, take }: PaginateProps) =>
  (req: Request, res: Response, next: () => void) => {
    req.query.take ??= String(Math.floor(take));
    req.query.skip ??= String(Math.floor(skip));
    next();
  };
