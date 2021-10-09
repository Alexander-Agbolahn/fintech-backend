import express from 'express';
import user from '../controllers/user';
import signUpValidator from '../middleware/validator/signUpValidator';
import signInValidator from '../middleware/validator/signInValidator';

const userRouter = express.Router();

userRouter.post('/signup', signUpValidator, user.signUp);
userRouter.post('/signin', signInValidator, user.signIn);

export default userRouter;