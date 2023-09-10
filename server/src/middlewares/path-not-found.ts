import { NotFoundError } from '../errors';
import { Request, Response } from 'express';

function pathNotFound(req: Request, res: Response) {
    throw new NotFoundError('Path does not exist');
}

export { pathNotFound };
