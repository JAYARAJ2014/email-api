import { Router } from 'express';
import 'express-async-errors';
import { handleAsync } from '../middlewares/async-handler';
import { emailHandler } from '../handlers/email-handler';

export const emailRouter: Router = Router();

emailRouter.post('/', handleAsync(emailHandler.sendEmail));
