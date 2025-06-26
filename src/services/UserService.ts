import {userRepository} from "../repositories/UserRepository.js";
import {UserRepositoryInterface} from "../repositories/interfaces/UserRepositoryInterface";
import {UserServiceInterface} from "./interfaces/UserServiceInterface";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto.js";
import {User} from "../domain/User.js";
import {AppError, ValidationError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class UserService implements UserServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor() {
        this.userRepository = userRepository;
    }

    async createUser(createUserData: CreateUserData): Promise<void> {

        if (await this.userRepository.isEmailExists(createUserData.email)) {
            throw new ValidationError(ErrorMessage.USER_ALREADY_EXISTS);
        }

        await this.userRepository.createUser(createUserData);
    }

    async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findUserById(id);

        if (!user) {
            throw new AppError(ErrorMessage.USER_NOT_FOUND);
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new AppError(ErrorMessage.USER_NOT_FOUND);
        }

        return user;
    }

    async updateUser(id: number, updateUserData: UpdateUserData): Promise<void> {
        const user = await this.findUserById(id);

        user.updateProfile(updateUserData.name, updateUserData.birth);

        await this.userRepository.updateUser(user);
    }

    async deleteUser(id: number): Promise<void> {
        await this.findUserById(id);

        await this.userRepository.deleteUser(id);
    }

    async changePassword(id: number, newPassword: string): Promise<void> {
        const user = await this.findUserById(id);

        await user.changePassword(newPassword);

        await this.userRepository.updateUser(user);
    }
}

export const userService = new UserService();