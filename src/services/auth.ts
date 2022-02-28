import { Injectable, Inject } from '@decorators/di';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User, USER_SELECT } from '../entities/User';
import { IUser } from '../types/user';

@Injectable()
export class AuthService {
    constructor(
        @Inject(User) private readonly userRepository: Repository<User>
    ) {}

    async createAndGetUser(user: IUser): Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            select: USER_SELECT,
        });
    }

    createAccessTokenByUserId(id: string): string {
        return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
            expiresIn: '7d',
        });
    }

    async createAndGetRefreshTokenByUserId(id: string): Promise<string> {
        const refreshToken = jwt.sign(
            { id },
            process.env.REFRESH_TOKEN_SECRET!
        );
        await this.userRepository.update(id, { refreshToken });
        return refreshToken;
    }
}
