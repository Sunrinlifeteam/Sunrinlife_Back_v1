import { Response as IResponse } from 'express';
import { Response, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { AuthService } from '../services/auth';

@Controller('/auth')
@Injectable()
export class AuthController {
    // eslint-disable-next-line no-unused-vars
    constructor(private readonly authService: AuthService) {}

    @Get('/')
    hello(@Response() res: IResponse) {
        const result = this.authService.hello();
        return res.status(200).json(result);
    }
}
