import { Response as IResponse, Request as IRequest } from 'express';
import { Response, Request, Controller, Get } from '@decorators/express';
import { Injectable } from '@decorators/di';
import { ClubInfoService } from '../services/clubInfo';
import logger from '../modules/logger';

@Controller('/club')
@Injectable()
export class ClubInfoController {
    constructor(private readonly clubInfoService: ClubInfoService) {
        logger.log('ClubInfoController Attached!');
    }

    @Get('/all')
    async getAllClubs(@Response() res: IResponse) {
        const result = await this.clubInfoService.getAllClubs();
        return res.status(200).json(result);
    }

    @Get('/department/:dep')
    async getClubsByDepartment(
        @Request() req: IRequest,
        @Response() res: IResponse
    ) {
        const result = await this.clubInfoService.getClubsByDepartment(
            parseInt(req.params.dep)
        );
        return res.status(200).json(result);
    }

    @Get('/type/:typ')
    async getClubsByType(@Request() req: IRequest, @Response() res: IResponse) {
        const result = await this.clubInfoService.getClubsByType(
            parseInt(req.params.typ)
        );
        return res.status(200).json(result);
    }

    @Get('/department/:dep/type/:typ')
    async getClubsByDepartmentAndType(
        @Request() req: IRequest,
        @Response() res: IResponse
    ) {
        const result = await this.clubInfoService.getClubsByDepartmentAndType(
            parseInt(req.params.dep),
            parseInt(req.params.typ)
        );
        return res.status(200).json(result);
    }
}
