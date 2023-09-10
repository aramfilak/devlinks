import { Router } from 'express';
import {
    getUser,
    login,
    signUp,
    updateUser,
    getUserById,
    uploadProfileImage
} from './user.service';
import { authenticate } from '../middlewares/auth';
import { upload } from '../middlewares/multer';

const userRouter = Router();

userRouter.post('/uploads', upload.single('profileImage'), authenticate, uploadProfileImage);
userRouter.get('/', authenticate, getUser);
userRouter.patch('/', authenticate, updateUser);

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/public/:id', getUserById);

export { userRouter };
