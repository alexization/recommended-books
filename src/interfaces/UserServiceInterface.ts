import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";

export interface UserServiceInterface {
    initialize(): Promise<void>;

    createUser(userData: CreateUserData): Promise<UserData>;

    findUserById(id: string): Promise<UserData[]>;

    findUserByEmail(email: string): Promise<UserData[]>;

    updateUser(id: string, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: string): Promise<void>;
}