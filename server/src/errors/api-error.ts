class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export { ApiError };
