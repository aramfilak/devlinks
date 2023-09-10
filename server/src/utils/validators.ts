function isInvalidPasswordFormat(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return !passwordRegex.test(password);
}

export { isInvalidPasswordFormat };
