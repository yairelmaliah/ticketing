import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@yair-tickets/common';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();
router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    // prettier-ignore
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (!existUser) throw new BadRequestError('Invalid credentials');

    const passwordMatch = await Password.compare(existUser.password, password);

    if (!passwordMatch) throw new BadRequestError('Invalid credentials');

    const userJwt = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
      },
      process.env.JWT_KEY!
    );

    res.cookie('jwt', userJwt, { httpOnly: true });

    res.status(200).send(existUser);
  }
);

export { router as signinRouter };
