import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../custom-errors/bad-request-error';
import bcrypt from 'bcryptjs';
import { UnAuthorizedError } from '../custom-errors/unauthorized-error';
class AuthHandler {
  public async login(req: Request, res: Response) {
    return res.status(StatusCodes.OK).json({ name: 'Jay' });
  }
}

export const authHandler = new AuthHandler();
