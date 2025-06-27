import {User} from "../../domain/User";
import {CountOfPostsPerUser, CreateUserData, UpdateUserData} from "../../domain/dto/UserDto";
import {Grade} from "../../domain/enums/Grade";

export interface UserRepositoryInterface {
    createUser(createUserData: CreateUserData): Promise<boolean>;

    findUserById(id: number): Promise<User>;

    findUserByEmail(email: string): Promise<User>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;

    getCountOfPostsPerUserByMonth(baseDate: string): Promise<CountOfPostsPerUser[]>;

    updateUserGrade(userIds: number[], grade: Grade): Promise<void>;
}