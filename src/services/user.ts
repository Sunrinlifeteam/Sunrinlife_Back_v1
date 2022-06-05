import { Inject, Injectable } from '@decorators/di';
import { Repository } from 'typeorm';
import { CLUB_TYPE, CLUB_TYPE_VALUES, valueOf } from '../constants';
import { UserEntity, USER_RELATIONS } from '../entities';
import { ClubInfoEntity } from '../entities/ClubInfo';

@Injectable()
export class UserService {
    constructor(
        @Inject(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject(ClubInfoEntity)
        private readonly clubRepository: Repository<ClubInfoEntity>
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

    async getClubType(id: number): Promise<CLUB_TYPE_VALUES | undefined> {
        const club = await this.clubRepository.findOne(id);
        return club?.type;
    }

    async update(id: string, data: any) {
        return await this.userRepository.update(id, data);
    }

    async updateSubClub(id: string, subClubIds: number[]) {
        let userRow = await this.userRepository.findOne(id);
        if (!userRow) return;
        userRow.subClubInfo = (
            await this.clubRepository.findByIds(subClubIds)
        ).filter((x) => x.type == CLUB_TYPE.AUTONOMY);
        return await this.userRepository.save(userRow);
    }
}
