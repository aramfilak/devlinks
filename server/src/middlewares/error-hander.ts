import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api-error';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose'; // Import Mongoose error types

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(StatusCodes.BAD_REQUEST).json(err.message);
    }
    if (process.env.NODE_ENV === 'development') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err });
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'SERVER ERROR 404' });
    }
}

export { errorHandler };
