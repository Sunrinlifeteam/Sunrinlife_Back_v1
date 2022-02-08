import { Injectable } from '@decorators/di';

@Injectable()
export class AuthService {
    constructor() {}

    hello(): string {
        return 'hello';
    }

    signup(): any {
        return {};
    }
}
