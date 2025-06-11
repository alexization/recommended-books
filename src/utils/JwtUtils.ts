import jwt from 'jsonwebtoken';
import {AppError} from "./AppError";

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
    private static readonly ACCESS_TOKEN_EXPIRE_TIME = '15m';
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
                throw new AppError('ACCESS_TOKEN_EXPIRED', 401);
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError('유효하지 않는 토큰입니다.', 401);
            }
            throw new AppError('토큰 검증에 실패했습니다.', 401);
        }
    }

    static verifyRefreshToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as JwtPayload;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError('토큰이 만료되었습니다.', 401);
            } else if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError('유효하지 않는 토큰입니다.', 401);
            }
            throw new AppError('토큰 검증에 실패했습니다.', 401);
        }
    }

    static extractToken(authToken?: string): string {
        if (!authToken) {
            throw new AppError('Authorization 헤더가 없습니다.', 401);
        }

        const parts = authToken.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new AppError('Bearer 토큰이 아닙니다.', 401);
        }

        return parts[1];
    }
}