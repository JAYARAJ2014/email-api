import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';
import { authRouter } from './routers/auth';
import { authMiddleware } from './middlewares/auth-middleware';
import { StatusCodes } from 'http-status-codes';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import xss from 'xss-clean';
import { emailRouter } from './routers/email';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

const app: Express = express();
const baseUrl: string = `/api/v1`;
app.use(express.json());
app.use(rateLimit());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/email`, emailRouter);

app.get('/', (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({ message: 'Email API' });
});

app.use(notFound);
app.use(errorHandler);

const startup = async () => {
  try {
    app.listen(port, () => {
      console.log('App Started. Listening Port#: ', port);
    });
  } catch (error) {
    console.log(error);
  }
};

startup();
