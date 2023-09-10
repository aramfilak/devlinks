import jwt from 'jsonwebtoken';
import { User } from '../user';

function generateJWT(id: string) {
    return jwt.sign({ id: id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME
    });
}

function sanitizeUser(user: User) {
    const { id, email, firstName, lastName, links, bio, profileImage } = user;
    // Convert the profileImage Buffer to a base64 string

    return {
        id,
        email,
        firstName,
        lastName,
        bio,
        profileImage,
        links
    };
}

export { generateJWT, sanitizeUser };
