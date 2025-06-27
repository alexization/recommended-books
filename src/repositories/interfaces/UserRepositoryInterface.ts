import {User} from "../../domain/aggregates/User";
import {CountOfPostsPerUser} from "../../domain/dto/UserDto";
import {Grade} from "../../domain/enums/Grade";

export interface UserRepositoryInterface {
    save(user: User): Promise<void>;

    findById(id: number): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    existsByEmail(email: string): Promise<boolean>;

    delete(id: number): Promise<void>;

    findUsersWithPostCounts(baseDate: string): Promise<CountOfPostsPerUser[]>;

    updateUsersGrade(userIds: number[], grade: Grade): Promise<void>;
}