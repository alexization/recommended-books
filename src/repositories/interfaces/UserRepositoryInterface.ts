import {User} from "../../domain/User";
import {CountOfPostsPerUser, CreateUserData, UpdateUserData} from "../../domain/dto/UserDto";
import {Grade} from "../../domain/enums/Grade";

export interface UserRepositoryInterface {
    createUser(createUserData: CreateUserData): Promise<void>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(user: User): Promise<void>;

    deleteUser(id: number): Promise<void>;

    getCountOfPostsPerUserByMonth(baseDate: string): Promise<CountOfPostsPerUser[]>;

    isEmailExists(email: string): Promise<boolean>;

    updateUserGrade(userIds: number[], grade: Grade): Promise<void>;
}