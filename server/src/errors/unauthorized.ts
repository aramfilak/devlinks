import { StatusCodes } from 'http-status-codes';
import { ApiError } from './api-error';

class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export { UnauthorizedError };
