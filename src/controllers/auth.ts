import { Response as IResponse } from 'express';
import { Response, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { AuthService } from '../services/auth';
import logger from '../modules/logger';

@Controller('/auth')
@Injectable()
export class AuthController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly authService: AuthService) {
        logger.debug('AuthController Attached!');
    }

    @Get('/')
    hello(@Response() res: IResponse) {
        const result = this.authService.hello();
        return res.status(200).json(result);
    }

    @Get('/signup')
    signup(@Response() res: IResponse) {
        const result = this.authService.signup();
        return res.status(200).json(result);
    }
}
