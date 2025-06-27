import {FollowRepositoryInterface} from "./interfaces/FollowRepositoryInterface";
import {Follow} from "../domain/entities/Follow";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {FollowData} from "../domain/dto/FollowDto";

export class FollowRepository implements FollowRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createFollow(follow: Follow): Promise<void> {
        try {
            const followData = follow.toPersistence();

            const query = 'INSERT INTO follows (following_id, follower_id, created_at) VALUES (?, ?, ?)';

            await this.db.executeQuery(query, [followData.following_id, followData.follower_id, followData.created_at]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deleteFollow(followId: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM follows
                           WHERE follow_id = ?`;

            await this.db.executeQuery(query, [followId]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findFollow(followingId: number, followerId: number): Promise<Follow> {
        try {
            const query = `SELECT *
                           FROM follows
                           WHERE following_id = ?
                             AND follower_id = ?`;

            const followData = await this.db.executeQuery<FollowData[]>(query, [followingId, followerId]);

            return Follow.fromJson(followData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findFollowersByUserId(userId: number, page: number, limit: number): Promise<Follow[]> {
        try {
            const offset = (page - 1) * limit;
            const query = `SELECT *
                           FROM follows
                           WHERE follower_id = ?
                           ORDER BY created_at DESC
                           LIMIT ? OFFSET ?`;

            const followData = await this.db.executeQuery<FollowData[]>(query, [userId, limit, offset]);

            return followData.map(data => Follow.fromJson(data));

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findFollowingsByUserId(userId: number, page: number, limit: number): Promise<Follow[]> {
        try {
            const offset = (page - 1) * limit;
            const query = `SELECT *
                           FROM follows
                           WHERE following_id = ?
                           ORDER BY created_at DESC
                           LIMIT ? OFFSET ?`;

            const followData = await this.db.executeQuery<FollowData[]>(query, [userId, limit, offset]);

            return followData.map(data => Follow.fromJson(data));

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async countFollowers(userId: number): Promise<number> {
        try {
            const query = `SELECT COUNT(*)
                           FROM follows
                           WHERE follower_id = ?`;

            const result = await this.db.executeQuery<{ count: bigint; }[]>(query, [userId]);

            return Number(result[0].count);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async countFollowings(userId: number): Promise<number> {
        try {
            const query = `SELECT COUNT(*)
                           FROM follows
                           WHERE following_id = ?`;

            const result = await this.db.executeQuery<{ count: bigint; }[]>(query, [userId]);

            return Number(result[0].count);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const followRepository = new FollowRepository();