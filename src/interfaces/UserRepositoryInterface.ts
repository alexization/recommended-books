import {User} from "../domain/User";
import {CreateUserData, UserData} from "../domain/dto/UserDto";

export interface UserRepositoryInterface {
    initialize(): Promise<void>;

    createUser(createUserData: CreateUserData): Promise<User>;

    findUserById(id: number): Promise<UserData[]>;

    findUserByEmail(email: string): Promise<UserData[]>;

    updateUser(updateUserData: UserData): Promise<UserData>;

    deleteUser(id: number): Promise<void>;
}