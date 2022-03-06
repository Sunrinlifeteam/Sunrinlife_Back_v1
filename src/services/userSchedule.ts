import { Inject, Injectable } from '@decorators/di';
import { UserSchedule } from '../entities/UserSchedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { IUser } from '../types/user';
import { User } from '../entities/User';
import { IUserSchedule, IWriteUserScheduleBody } from '../types/userSchedule';
import { Today, Week } from '../modules/typeorm';

@Injectable()
export class UserScheduleService {
    constructor(
        @Inject(UserSchedule)
        private readonly userScheduleRepository: Repository<UserSchedule>,
        @Inject(User)
        private readonly userRepository: Repository<User>
    ) {}

    async week(user: Repository<User>): Promise<UserSchedule[]> {
        logger.debug('called', 'services.mySchedule.list', user);
        let find = await UserSchedule.find({
            where: {
                date: Week(new DateTime()),
            },
        });
        logger.debug('services.mySchedule.list', find);
        return find;
    }

    async write(userData: IUser, body: IWriteUserScheduleBody): Promise<any> {
        const user = await this.userRepository.findOne(userData);
        const newSchedule = this.userScheduleRepository.create({
            ...body,
            owner: user,
            date: Today(),
        });
        return await this.userScheduleRepository.save(newSchedule);
    }
}
