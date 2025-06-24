import jwt from 'jsonwebtoken';
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export interface JwtPayload {
    userId: number;
    email: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export class JwtUtils {
    private static readonly ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;
    private static readonly REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;
    private static readonly ACCESS_TOKEN_EXPIRE_TIME = '15h';
    private static readonly REFRESH_TOKEN_EXPIRE_TIME = '7d';

    static generateJwtToken(userId: number, email: string): TokenPair {
        const payload: JwtPayload = {
            userId, email
        };

        const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {expiresIn: this.ACCESS_TOKEN_EXPIRE_TIME});
        const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {expiresIn: this.REFRESH_TOKEN_EXPIRE_TIME});

        return {accessToken, refreshToken};
    }

    static verifyAccessToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError(ErrorMessage.ACCESS_TOKEN_EXPIRED);
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError(ErrorMessage.INVALID_TOKEN);
            }
            throw new AppError(ErrorMessage.TOKEN_VERIFICATION_FAILED);
        }
    }

    static verifyRefreshToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError(ErrorMessage.REFRESH_TOKEN_EXPIRED);
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError(ErrorMessage.INVALID_TOKEN);
            }
            throw new AppError(ErrorMessage.TOKEN_VERIFICATION_FAILED);
        }
    }

    static extractToken(authToken?: string): string {
        if (!authToken) {
            throw new AppError(ErrorMessage.AUTHORIZATION_HEADER_MISSING);
        }

        const parts = authToken.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new AppError(ErrorMessage.INVALID_BEARER_TOKEN);
        }

        return parts[1];
    }
}