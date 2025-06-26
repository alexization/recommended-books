import {userRepository} from "../repositories/UserRepository.js";
import {UserRepositoryInterface} from "../repositories/interfaces/UserRepositoryInterface";
import {UserServiceInterface} from "./interfaces/UserServiceInterface";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto.js";
import {User} from "../domain/User.js";

export class UserService implements UserServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor() {
        this.userRepository = userRepository;
    }

    async createUser(createUserData: CreateUserData): Promise<boolean> {
        return await this.userRepository.createUser(createUserData);
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(id: number, updateUserData: UpdateUserData): Promise<void> {
        const user = await this.findUserById(id);

        user.updateProfile(updateUserData.name, updateUserData.birth);

        return await this.userRepository.updateUser(user);
    }

    async deleteUser(id: number): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }

    async changePassword(id: number, newPassword: string): Promise<void> {
        const user = await this.findUserById(id);

        await user.changePassword(newPassword);

        return await this.userRepository.updateUser(user);
    }
}

export const userService = new UserService();