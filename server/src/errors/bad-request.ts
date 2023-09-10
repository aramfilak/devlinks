import { ApiError } from './api-error';
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

export { BadRequestError };
