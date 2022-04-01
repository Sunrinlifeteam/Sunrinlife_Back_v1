import { Inject, Injectable } from '@decorators/di';
import { Repository } from 'typeorm';
import { UserEntity, USER_RELATIONS, USER_SELECT } from '../entities';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async fetch(id: string) {
        return await this.userRepository.findOne(id);
    }

    async fetchWithRelations(
        id: string,
        relations: (keyof UserEntity)[] = USER_RELATIONS
    ) {
        return await this.userRepository.findOne({
            where: { id },
            relations: relations,
        });
    }

    async update(id: string, data: any) {
        return await this.userRepository.update(id, data);
    }
}
