import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../custom-errors/bad-request-error';
import bcrypt from 'bcryptjs';
import { UnAuthorizedError } from '../custom-errors/unauthorized-error';
import nodemailer, { Transporter } from 'nodemailer';
import { CustomApiError } from '../custom-errors/custom-api-error';
class EmailHandler {
  public async sendEmail(req: Request, res: Response) {
   
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
              user: '',
              pass: process.env.SMTP_PASSWORD
            }
          });
          console.log(req.body);
          nodemailer.createTestAccount();
      
          let info = await transporter.sendMail({ ...req.body });
      
          return res.status(StatusCodes.OK).json({info:info,originalMessage: req.body});
    

   
  }
}

export const emailHandler = new EmailHandler();
