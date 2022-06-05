import { Inject, Injectable } from '@decorators/di';
import { Repository } from 'typeorm';
import { ClubInfoEntity, CLUB_SELECT } from '../entities/ClubInfo';
import { IClubInfoBody } from '../types/clubInfo';

@Injectable()
export class ClubInfoService {
    constructor(
        @Inject(ClubInfoEntity)
        private readonly clubInfoRepository: Repository<ClubInfoEntity>
    ) {}

    async createAndGetClub(club: IClubInfoBody): Promise<ClubInfoEntity> {
        const newClub = this.clubInfoRepository.create(club);
        return await this.clubInfoRepository.save(newClub);
    }

    async getAllClubs() {
        return await this.clubInfoRepository.find({
            select: CLUB_SELECT,
        });
    }

    async getClubsByDepartment(department: number) {
        return await this.clubInfoRepository.find({
            where: { department },
            select: CLUB_SELECT,
        });
    }

    async getClubsByDepartmentAndType(department: number, type: number) {
        return await this.clubInfoRepository.find({
            where: { department, type },
            select: CLUB_SELECT,
        });
    }

    async getClubsByType(type: number) {
        return await this.clubInfoRepository.find({
            where: { type },
            select: CLUB_SELECT,
        });
    }
}
