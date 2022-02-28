import { Injectable, Inject } from '@decorators/di';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { IUser } from '../types/user';

@Injectable()
export class AuthService {
    constructor(
        @Inject(User) private readonly userRepository: Repository<User>
    ) {}

    async hello(): Promise<string> {
        return 'hello';
    }

    async createUser(user: IUser): Promise<void> {
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({ email });
    }
}
