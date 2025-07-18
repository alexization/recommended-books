import {userRepository} from "../repositories/UserRepository.js";
import {UserRepositoryInterface} from "../repositories/interfaces/UserRepositoryInterface";
import {UserServiceInterface} from "./interfaces/UserServiceInterface";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto.js";
import {User} from "../domain/aggregates/User";
import {AppError, ValidationError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class UserService implements UserServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor() {
        this.userRepository = userRepository;
    }

    async createUser(createUserData: CreateUserData): Promise<void> {
        if (await this.userRepository.existsByEmail(createUserData.email)) {
            throw new ValidationError(ErrorMessage.USER_ALREADY_EXISTS);
        }

        const user = await User.create(createUserData);

        await this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new AppError(ErrorMessage.USER_NOT_FOUND);
        }

        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError(ErrorMessage.USER_NOT_FOUND);
        }

        return user;
    }

    async updateUser(id: number, updateUserData: UpdateUserData): Promise<void> {
        const user = await this.getUserById(id);
        user.updateProfile(updateUserData.name, updateUserData.birth);

        await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        await this.getUserById(id);

        await this.userRepository.delete(id);
    }

    async changePassword(id: number, newPassword: string): Promise<void> {
        const user = await this.getUserById(id);
        await user.changePassword(newPassword);

        await this.userRepository.save(user);
    }
}

export const userService = new UserService();