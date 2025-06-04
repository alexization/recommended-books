import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";

export interface UserServiceInterface {
    initialize(): Promise<void>;

    createUser(userData: CreateUserData): Promise<UserData>;

    findUserById(id: number): Promise<UserData[]>;

    findUserByEmail(email: string): Promise<UserData[]>;

    updateUser(id: number, updateUserData: UpdateUserData): Promise<void>;

    deleteUser(id: number): Promise<void>;
}