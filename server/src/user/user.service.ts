import { Request, Response } from 'express';
import { User } from './user.model';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { StatusCodes } from 'http-status-codes';
import { generateJWT, isInvalidPasswordFormat, sanitizeUser } from '../utils';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
/**----------------------------------------------------------------
 * @description Upload profile image
 * @access private
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *----------------------------------------------------------------*/

async function uploadProfileImage(req: Request, res: Response) {
    const id = req.user?.id;
    // @ts-ignore
    const tempImage = req.file.path;

    if (!tempImage) {
        throw new BadRequestError('No image to upload');
    }

    const result = await cloudinary.uploader.upload(tempImage, {
        folder: 'devlinks-users',
        unique_filename: true,
        resource_type: 'auto'
    });

    fs.unlinkSync(tempImage);

    const user = await User.findByIdAndUpdate(
        id,
        { profileImage: result.secure_url },
        {
            new: true,
            runValidators: true
        }
    );

    if (!user) {
        throw new NotFoundError('User not found');
    }

    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json({ message: 'Updated successfully', user: sanitizedUser });
}
/**----------------------------------------------------------------
 * @description Get a user by their ID.
 * @access public
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *----------------------------------------------------------------*/
async function getUserById(req: Request, res: Response) {
    const id = req.params?.id;
    if (!id) {
        throw new BadRequestError('Invalid or missing user ID');
    }

    const user = await User.findById(id);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Sanitize the user object
    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json(sanitizedUser);
}

/**----------------------------------------------------------------
 * @description Get a user by their ID.
 * @access private
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *----------------------------------------------------------------*/
async function getUser(req: Request, res: Response) {
    const id = req.user?.id;
    if (!id) {
        throw new BadRequestError('Invalid or missing user ID');
    }

    const user = await User.findById(id);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    // Sanitize the user object
    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json(sanitizedUser);
}

/**----------------------------------------------------------------
 * @description Update a user's information.
 * @access private
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *----------------------------------------------------------------*/
async function updateUser(req: Request, res: Response) {
    const id = req.user?.id;
    const body = req.body;

    if (!id) {
        throw new BadRequestError('Invalid or missing user ID');
    }

    const user = await User.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true
    });

    if (!user) {
        throw new NotFoundError('User not found');
    }

    const sanitizedUser = sanitizeUser(user);

    res.status(StatusCodes.OK).json({ message: 'Updated successfully', user: sanitizedUser });
}

/**----------------------------------------------------------------
 * @description Sign up a user.
 * @access public
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *----------------------------------------------------------------*/
async function signUp(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        throw new BadRequestError('Email and/or password not provided');
    }
    // Check Password Format
    if (isInvalidPasswordFormat(password)) {
        throw new BadRequestError(
            'Password must contain at least one letter, one number and one special character'
        );
    }
    // Check if email already exists
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
        throw new BadRequestError('Email already in use');
    }

    // Generate a salted and hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save it
    const user = await User.create({ email: email, password: hashedPassword });

    // Generate token
    const token = generateJWT(user.id);

    res.status(StatusCodes.CREATED).json({ message: 'Signup success', token, user: user });
}

/**----------------------------------------------------------------
 * @description Login in a user.
 * @access public
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 *----------------------------------------------------------------*/
async function login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        throw new BadRequestError('Email and/or password not provided');
    }

    // Check if User exists
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new UnauthorizedError('Email is not registered');
    }

    // Compare provided password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new UnauthorizedError('Incorrect password');
    }

    // Generate token
    const token = generateJWT(user.id);
    return res.status(200).json({ message: 'Logged in successfully', token, user: user });
}

export { getUser, updateUser, signUp, login, getUserById, uploadProfileImage };
