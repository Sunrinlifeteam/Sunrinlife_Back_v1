import { Inject, Injectable } from '@decorators/di';
import { UserSchedule } from '../entities/UserSchedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { IUser } from '../types/user';
import { User } from '../entities/User';
import { IUserSchedule } from '../types/userSchedule';
import { Week } from '../modules/typeorm';

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

    async write(userData: IUser, body: IUserSchedule): Promise<any> {
        const user = this.userRepository.find(userData);
        const newSchedule = this.userScheduleRepository.create(body);
        return await this.userScheduleRepository.save(newSchedule);
    }
}
