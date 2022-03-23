import { Inject, Injectable } from '@decorators/di';
import { UserScheduleEntity } from '../entities/UserSchedule';
import logger from '../modules/logger';
import { DateTime } from 'luxon';
import { DeleteResult, Repository } from 'typeorm';
import { IUser } from '../types/user';
import { UserEntity } from '../entities/User';
import { IWriteUserScheduleBody } from '../types/userSchedule';
import { Format, Week } from '../modules/typeorm';

@Injectable()
export class UserScheduleService {
    constructor(
        @Inject(UserScheduleEntity)
        private readonly userScheduleRepository: Repository<UserScheduleEntity>,
        @Inject(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async week(user: IUser): Promise<UserScheduleEntity[]> {
        logger.debug(
            'called',
            'services/userSchedule.ts/UserScheduleService.week',
            user
        );
        const owner = await this.userRepository.findOne({ email: user.email });
        if (!owner) throw new Error('Unauthorization');
        const userSchedules = await this.userScheduleRepository.find({
            where: {
                date: Week(DateTime.now()),
                owner: owner,
            },
        });
        logger.debug('services.mySchedule.list', userSchedules);
        return userSchedules;
    }

    async write(
        userData: IUser,
        body: IWriteUserScheduleBody
    ): Promise<UserScheduleEntity> {
        const user = await this.userRepository.findOne(userData);
        if (!user) throw new Error('Unauthorization');
        const newSchedule = this.userScheduleRepository.create({
            ...body,
            owner: user,
            date: Format(DateTime.fromObject(body.date)),
        });
        return await this.userScheduleRepository.save(newSchedule);
    }

    async delete(userData: IUser, id: number): Promise<DeleteResult> {
        const user = await this.userRepository.findOne(userData);
        if (!user) throw new Error('Unauthorization');
        return await this.userScheduleRepository.delete({
            id,
            owner: user,
        });
    }
}
