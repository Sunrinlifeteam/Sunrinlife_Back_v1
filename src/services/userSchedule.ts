import { Inject, Injectable } from '@decorators/di';
import { UserScheduleEntity } from '../entities/UserSchedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { IUser } from '../types/user';
import { UserEntity } from '../entities/User';
import { IWriteUserScheduleBody } from '../types/userSchedule';
import { Today, Week } from '../modules/typeorm';

@Injectable()
export class UserScheduleService {
    constructor(
        @Inject(UserScheduleEntity)
        private readonly userScheduleRepository: Repository<UserScheduleEntity>,
        @Inject(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async week(user: UserEntity): Promise<UserScheduleEntity[]> {
        logger.debug('called', 'services.mySchedule.list', user);
        const userSchedules = await this.userScheduleRepository.find({
            date: Week(new DateTime()),
        });
        logger.debug('services.mySchedule.list', userSchedules);
        return userSchedules;
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
