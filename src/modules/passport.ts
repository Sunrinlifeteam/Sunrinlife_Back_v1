import { User } from '../entities/User';

export async function oAuthHandler(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any
) {
    const email = profile.emails[0].value;
    try {
        const user = await User.findOne({ email });
        if (user) done(null, user);
    } catch (err) {
        return done(err as string);
    }
}
