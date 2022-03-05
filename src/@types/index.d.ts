import UserModel from '../types/user'; // <- User class

declare global {
    namespace Express {
        export interface User extends UserModel {}
    }
}
