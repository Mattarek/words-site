import { sign } from 'jsonwebtoken';

export const createAccessToken = (user) => {
    return sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: '10m',
    });
};

export const createRefreshToken = (user) => {
    return sign(
        { userId: user._id, tokenVersion: user.tokenVersion },
        process.env.JWT_REFRESH_SECRET!,
        {
            expiresIn: '7d',
        },
    );
};
